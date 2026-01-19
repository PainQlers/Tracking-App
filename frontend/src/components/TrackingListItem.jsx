import { useState } from 'react';
import RatingComponent from './RatingComponent';
import { trackingAPI } from '../services/api';
import '../styles/TrackingListItem.css';

const STATUS_COLORS = {
  'In Transit': '#0088FE',
  'Delivered': '#00C49F',
  'Delayed': '#FFBB28',
  'Canceled': '#FF8042',
  'Created': '#8884D8',
};

export default function TrackingListItem({ tracking, onRatingSubmit, onTrackingUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: tracking.name,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getStatusColor = (status) => STATUS_COLORS[status] || '#999';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `${diffDays}d ${diffHours}h`;
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      await trackingAPI.update(tracking.id, editData);
      
      setIsEditMode(false);
      if (onTrackingUpdate) {
        onTrackingUpdate();
      } else {
        onRatingSubmit();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update tracking');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      name: tracking.name,
    });
    setIsEditMode(false);
    setError('');
  };

  return (
    <div className="tracking-item">
      <div className="item-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="item-main-info">
          <div className="item-id-name">
            <span className="tracking-id">#{tracking.id}</span>
            <span className="tracking-name">{tracking.name}</span>
          </div>
          {tracking.status === 'Created' && !isEditMode && (
            <button 
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditMode(true);
                setIsExpanded(true);
              }}
              title="Edit this tracking"
            >
              ✎
            </button>
          )}
          <div className="item-status">
            <span
              className="status-badge"
              style={{ backgroundColor: getStatusColor(tracking.status) }}
            >
              {tracking.status}
            </span>
          </div>
        </div>

        <div className="item-side-info">
          <span className="service-fee">฿{tracking.serviceFee?.toLocaleString() || 0}</span>
          <button className="expand-btn">
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="item-details">
          {error && <div className="edit-error">{error}</div>}
          
          {isEditMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Tracking Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button
                  className="btn-save"
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="btn-cancel"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="detail-row">
                <div className="detail-col">
                  <label>Order Time</label>
                  <p>{formatDate(tracking.orderTime)}</p>
                </div>
                <div className="detail-col">
                  <label>Completed Time</label>
                  <p>{tracking.completedTime ? formatDate(tracking.completedTime) : "อยู่ในระหว่างดำเนินการ"}</p>
                </div>
                <div className="detail-col">
                  <label>Duration</label>
                  <p>{tracking.completedTime ? calculateDuration(tracking.orderTime, tracking.completedTime) : calculateDuration(tracking.orderTime, Date.now())}</p>
                </div>
              </div>

              <div className="rating-row">
                {tracking.status === 'Delivered' ? (
                  <>
                    <label>Rate this tracking</label>
                    <RatingComponent
                      trackingId={tracking.id}
                      initialRating={tracking.rating || 0}
                      onRatingSubmit={onRatingSubmit}
                    />
                  </>
                ) : (
                  <div className="rating-unavailable">
                    <label>Rating available only for Delivered trackings</label>
                    {tracking.rating ? (
                      <span className="rating-display">
                        ★ {tracking.rating}/5
                      </span>
                    ) : (
                      <span className="no-rating"></span>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
