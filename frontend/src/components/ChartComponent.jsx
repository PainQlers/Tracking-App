import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../styles/ChartComponent.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const STATUS_COLORS = {
  'In Transit': '#0088FE',
  'Delivered': '#00C49F',
  'Delayed': '#FFBB28',
  'Canceled': '#FF8042',
  'Created': '#8884D8',
};

export default function ChartComponent({ summary }) {
  if (!summary) {
    return <div className="chart-loading">Loading chart data...</div>;
  }

  const statusData = Object.entries(summary.statusSummary || {}).map(
    ([status, count]) => ({
      name: status,
      value: count,
      color: STATUS_COLORS[status] || '#999',
    })
  );

  const totalData = [
    {
      name: 'Total Service Fee',
      value: summary.totalServiceFee || 0,
    },
  ];

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <h3 className='font-semibold'>Tracking Status Distribution</h3>
        <div className="chart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-wrapper">
        <h3 className='font-semibold'>Summary Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Trackings</div>
            <div className="stat-value">{summary.totalTrackings || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Service Fee</div>
            <div className="stat-value">฿{(summary.totalServiceFee || 0).toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Average Rating</div>
            <div className="stat-value">{summary.averageRating || 'N/A'}</div>
          </div>
        </div>

        <div className="status-breakdown">
          <h4 className='font-semibold'>Status Breakdown</h4>
          {statusData.map((item) => (
            <div key={item.name} className="status-item">
              <span
                className="status-color"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="status-name">{item.name}</span>
              <span className="status-count">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
