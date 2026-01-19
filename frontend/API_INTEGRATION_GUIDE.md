# API Integration Guide

## Overview

This frontend application communicates with a backend API running at `http://localhost:3000`. The API service layer is located in `src/services/api.js` and handles all HTTP requests with automatic authentication.

## Authentication

### Login Flow

**Endpoint:** `POST /api/auth/login`

**Request:**
```javascript
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "email": "john@example.com"
    }
  }
}
```

**How it works:**
1. User submits credentials on LoginPage
2. `authAPI.login()` sends POST request
3. Token is extracted and stored in localStorage
4. Token is automatically added to all subsequent requests
5. User is redirected to dashboard

### Token Storage & Auto-Injection

The API client automatically:
- Reads token from localStorage on each request
- Adds `Authorization: Bearer {token}` header
- Handles 401 responses by clearing token and redirecting to login

```javascript
// In src/services/api.js
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Tracking Endpoints

### Get All Trackings

**Endpoint:** `GET /api/trackings`

**Query Parameters:**
- `page` (number) - Page number for pagination
- `limit` (number) - Items per page
- `search` (string) - Search by tracking ID or name
- `status` (string) - Filter by status
- `sortBy` (string) - Field to sort by (orderTime, completedTime, serviceFee, status, name)
- `sortOrder` (string) - asc or desc

**Example Request:**
```javascript
const response = await trackingAPI.getAll({
  page: 1,
  limit: 10,
  search: 'Closet',
  status: 'In Transit',
  sortBy: 'orderTime',
  sortOrder: 'desc'
});
```

**Response:**
```javascript
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Closet",
      "status": "In Transit",
      "orderTime": "2026-01-14T10:00:00Z",
      "completedTime": "2026-01-14T10:00:00Z",
      "serviceFee": 100,
      "rating": 4
    }
  ]
}
```

**Used in:** DashboardPage.jsx with infinite scroll

### Create Tracking

**Endpoint:** `POST /api/trackings`

**Request:**
```javascript
{
  "name": "Closet",
  "serviceFee": 100
}
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "id": "2",
    "name": "Closet",
    "status": "Created",
    "serviceFee": 100
  }
}
```

**Usage:**
```javascript
await trackingAPI.create({
  name: "Item Name",
  serviceFee: 150
});
```

### Update Tracking

**Endpoint:** `PUT /api/trackings/:id`

**Request:**
```javascript
{
  "name": "Updated Closet",
  "serviceFee": 120,
  "orderTime": "2026-01-15T10:00:00Z",
  "status": "created"
}
```

**Usage:**
```javascript
await trackingAPI.update("1", {
  name: "Updated Name",
  serviceFee: 120,
  status: "In Transit"
});
```

### Vote/Rate Tracking

**Endpoint:** `POST /api/trackings/:id/vote`

**Request:**
```javascript
{
  "rating": 4
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "Vote recorded successfully"
}
```

**Usage:**
```javascript
await trackingAPI.vote("1", 4);
```

**Restrictions:**
- One vote per user per tracking
- User cannot change their vote
- Rating should be 1-5

**Used in:** RatingComponent.jsx

## Chart Endpoints

### Get Summary Data

**Endpoint:** `GET /api/chart/summary`

**Response:**
```javascript
{
  "success": true,
  "data": {
    "totalTrackings": 4,
    "statusSummary": {
      "In Transit": 1,
      "Delivered": 1,
      "Delayed": 1,
      "Canceled": 1
    },
    "totalServiceFee": 350,
    "averageRating": "4.0"
  }
}
```

**Usage:**
```javascript
const response = await chartAPI.getSummary();
// Data used in ChartComponent for analytics
```

**Used in:** DashboardPage.jsx for chart rendering

## Error Handling

### Automatic Error Handling

The API client automatically handles:
- 401 Unauthorized - Logs out user and redirects to login
- Network errors - Returns error in catch block
- Response errors - Includes error messages from server

### Try-Catch Pattern

```javascript
try {
  const response = await trackingAPI.getAll(params);
  setTrackings(response.data.data);
} catch (error) {
  const errorMsg = error.response?.data?.message || 'Failed to load';
  setError(errorMsg);
}
```

### Error Response Format

The backend may return errors like:
```javascript
{
  "success": false,
  "message": "Invalid credentials",
  "errors": ["email is required", "password is required"]
}
```

## Implementation Examples

### Search Example

```javascript
const handleSearch = (query) => {
  setSearchQuery(query);
  // Automatically triggers re-fetch via useEffect dependency
};

// In DashboardPage:
const params = {
  page: 1,
  limit: 10,
  search: searchQuery  // Added automatically
};

const response = await trackingAPI.getAll(params);
```

### Filter & Sort Example

```javascript
const handleFilter = (status) => {
  setStatusFilter(status);
  setPage(1); // Reset to first page
};

const params = {
  page: 1,
  limit: 10,
  status: statusFilter,      // Only if status selected
  sortBy: 'orderTime',
  sortOrder: 'desc'
};
```

### Rating Example

```javascript
const handleRating = async (trackingId, value) => {
  try {
    await trackingAPI.vote(trackingId, value);
    // Refresh summary data
    const response = await chartAPI.getSummary();
    setSummary(response.data.data);
  } catch (error) {
    console.error('Rating failed:', error);
  }
};
```

## Testing the API

### Using the Demo Account

```
Email: john@example.com
Password: 123456
```

1. Navigate to http://localhost:5173/
2. Login with demo credentials
3. API calls will automatically include the Bearer token

### Checking Network Requests

Open browser DevTools (F12) → Network tab to see:
- Request headers with Authorization token
- Request/response payloads
- Response status codes

### Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Token expired or invalid. Login again |
| 404 Not Found | Wrong API endpoint URL in api.js |
| CORS Error | Backend needs CORS configuration |
| Timeout | Backend server not running |
| Empty response | Check response format matches expected structure |

## API Base URL Configuration

To change the backend URL, edit `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';  // Change this
```

## Advanced Features

### Pagination with Infinite Scroll

The frontend implements infinite scroll by:
1. Fetching initial page (page 1)
2. Using Intersection Observer to detect when user scrolls to bottom
3. Automatically fetching next page
4. Appending new items to existing list
5. Stopping when `hasMore` is false

```javascript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
      fetchTrackings(page + 1, true); // Load more
    }
  });
  
  observer.observe(observerTarget.current);
  return () => observer.disconnect();
}, [page, hasMore]);
```

### Search Debouncing (Optional Enhancement)

Current implementation searches immediately. To optimize:

```javascript
import { useCallback } from 'react';

const debouncedSearch = useCallback(
  debounce((query) => {
    setSearchQuery(query);
  }, 500),
  []
);
```

## Response Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Proceed with data |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid parameters, check request |
| 401 | Unauthorized | Token invalid or expired, redirect to login |
| 403 | Forbidden | User doesn't have permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Backend error, try again later |
