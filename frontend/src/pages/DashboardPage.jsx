import { useState, useEffect, useCallback, useRef } from 'react';
import TrackingListItem from '../components/TrackingListItem';
import ChartComponent from '../components/ChartComponent';
import { trackingAPI, chartAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/DashboardPage.css';

export default function DashboardPage() {
  const { logout } = useAuth();
  const [trackings, setTrackings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableStatuses, setAvailableStatuses] = useState([]);

  // Search & Filter & Sort
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('orderTime');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Create Tracking Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createData, setCreateData] = useState({
    name: '',
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  const ITEMS_PER_PAGE = 10;

  // Fetch trackings
  const fetchTrackings = useCallback(
    async (pageNum = 1) => {
      try {
        setIsLoading(true);

        const params = {
          page: pageNum,
          limit: ITEMS_PER_PAGE,
          search: searchQuery,
          ...(statusFilter && { status: statusFilter }),
          sortBy,
          order: sortOrder,
        };

        const response = await trackingAPI.getAll(params);
        const newData = (response.data.data || []).slice(0, ITEMS_PER_PAGE);

        setTrackings(newData);
        setTotalPages(Math.ceil((response.data.total || 0) / ITEMS_PER_PAGE));
        setError('');
      } catch (err) {
        setError('Failed to load trackings');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, statusFilter, sortBy, sortOrder]
  );

  // Fetch chart summary
  const fetchSummary = useCallback(async () => {
    try {
      const response = await chartAPI.getSummary();
      setSummary(response.data.data || response.data);
    } catch (err) {
      console.error('Failed to load summary:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    setPage(1);
    fetchTrackings(1, false);
    fetchSummary();
  }, [searchQuery, statusFilter, sortBy, sortOrder, fetchTrackings, fetchSummary]);

  // Fetch available statuses (without filters)
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await trackingAPI.getAll({
          page: 1,
          limit: 100,
        });
        const statuses = [...new Set((response.data.data || []).map(t => t.status))];
        setAvailableStatuses(statuses);
      } catch (err) {
        console.error('Failed to load statuses:', err);
      }
    };
    fetchStatuses();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchTrackings(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchTrackings(page + 1);
    }
  };

  const handleRatingSubmit = () => {
    fetchSummary();
  };

  const handleTrackingUpdate = () => {
    fetchTrackings(page);
    fetchSummary();
  };

  const handleCreateChange = (field, value) => {
    setCreateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTracking = async () => {
    try {
      setIsCreating(true);
      setCreateError('');

      if (!createData.name.trim()) {
        setCreateError('Tracking name is required');
        return;
      }

      await trackingAPI.create({
        name: createData.name,
        serviceFee: 50, // Fixed at 50 baht
      });

      setIsCreateModalOpen(false);
      setCreateData({ name: '' });
      setPage(1);
      fetchTrackings(1);
      fetchSummary();
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create tracking');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setCreateData({ name: '' });
    setCreateError('');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className='p-5'>Tracking Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <ChartComponent summary={summary} />

      <div className="dashboard-container">
        <div className="create-tracking-btn-container">
          <button
            className="create-tracking-btn"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Create New Tracking
          </button>
        </div>

        <div className="controls-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by tracking ID or name..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-controls">
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={handleSort}
              className="filter-select"
            >
              <option value="orderTime">Sort by Order Time</option>
              <option value="completedTime">Sort by Completed Time</option>
              <option value="serviceFee">Sort by Service Fee</option>
              <option value="status">Sort by Status</option>
              <option value="name">Sort by Name</option>
            </select>

            <button
              className="sort-order-btn"
              onClick={handleSortOrder}
              title={`Sort: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {isLoading && trackings.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading trackings...</p>
          </div>
        ) : trackings.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📦</p>
            <p>No trackings found</p>
            <p className="empty-hint">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="trackings-list">
            {trackings.map((tracking) => (
              <TrackingListItem
                key={tracking.id}
                tracking={tracking}
                onRatingSubmit={handleRatingSubmit}
                onTrackingUpdate={handleTrackingUpdate}
              />
            ))}
          </div>
        )}

        {trackings.length > 0 && (
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={page === 1 || isLoading}
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={page === totalPages || isLoading}
            >
              Next →
            </button>
          </div>
        )}

        {isCreateModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create New Tracking</h2>
                <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
              </div>
              
              {createError && <div className="modal-error">{createError}</div>}

              <div className="modal-body">
                <div className="form-group">
                  <label>Tracking Name *</label>
                  <input
                    type="text"
                    placeholder="Enter tracking name"
                    value={createData.name}
                    onChange={(e) => handleCreateChange('name', e.target.value)}
                    className="form-input"
                    disabled={isCreating}
                  />
                </div>

                <div className="service-fee-info">
                  <label>Service Fee</label>
                  <p>฿50</p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn-cancel"
                  onClick={handleCloseModal}
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  className="btn-create"
                  onClick={handleCreateTracking}
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
