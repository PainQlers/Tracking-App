# Tracking Dashboard - Frontend

A comprehensive React + Vite frontend application for tracking and managing shipment/project statuses in real-time with advanced features like filtering, sorting, rating system, and analytics.

## 🎯 Features

### Authentication
- ✅ Login page with Bearer token authentication
- ✅ Automatic token management and API request interceptors
- ✅ Protected routes - automatic redirect to login when unauthorized
- ✅ Logout functionality

### Dashboard
- ✅ Real-time tracking item list with infinite scroll/lazy loading
- ✅ Display of tracking details:
  - Tracking ID
  - Item name
  - Current status (In Transit, Delivered, Delayed, Canceled, etc.)
  - Order & completion dates
  - Service fee
  - Duration calculation

### Search & Filtering
- ✅ Search by Tracking ID or item name
- ✅ Filter by status
- ✅ Sort by multiple fields (Order Time, Service Fee, Status, Name)
- ✅ Ascending/Descending sort order

### Advanced Features
- ✅ Star rating system (1-5 stars, 1 vote per user)
- ✅ Real-time analytics dashboard with charts
- ✅ Pie chart showing status distribution
- ✅ Summary statistics (total trackings, service fees, average rating)
- ✅ Infinite scroll pagination for large datasets

### UI/UX States
- ✅ Loading states with spinners
- ✅ Empty state with helpful messaging
- ✅ Error handling and error messages
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Expandable tracking item cards

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── RatingComponent.jsx
│   │   ├── TrackingListItem.jsx
│   │   ├── ChartComponent.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/              # React Context for state management
│   │   └── AuthContext.jsx
│   ├── pages/                # Full page components
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   ├── services/             # API service layer
│   │   └── api.js
│   ├── styles/               # Component CSS files
│   │   ├── LoginPage.css
│   │   ├── DashboardPage.css
│   │   ├── TrackingListItem.css
│   │   ├── RatingComponent.css
│   │   └── ChartComponent.css
│   ├── App.jsx               # Main app routing
│   ├── App.css
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔌 API Configuration

The backend API is configured to run at `http://localhost:3000`. Update the base URL in [src/services/api.js](src/services/api.js) if your backend runs on a different port.

### Required API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/trackings` - Get all tracking items (supports query params: search, filter, sort)
- `POST /api/trackings/:id/vote` - Rate a tracking item
- `POST /api/trackings` - Create new tracking
- `PUT /api/trackings/:id` - Update tracking
- `GET /api/chart/summary` - Get summary data for charts

## 🔐 Authentication Flow

1. User enters credentials on Login page
2. API returns Bearer token
3. Token is stored in `localStorage`
4. All API requests automatically include `Authorization: Bearer {token}` header
5. On unauthorized (401) response, user is redirected to login

## 📊 Components Overview

### LoginPage
- Email and password input fields
- Form validation
- Error message display
- Demo credentials display

### DashboardPage
- Header with logout button
- Search input
- Filter and sort controls
- Tracking items list with infinite scroll
- Chart component for analytics

### TrackingListItem
- Expandable card layout
- Status badge with color coding
- Service fee display
- Expandable details section with:
  - Order and completion dates
  - Duration calculation
  - Rating component

### ChartComponent
- Pie chart showing status distribution
- Summary statistics cards
- Status breakdown table

### RatingComponent
- 5-star rating system
- Hover effects
- One vote per user protection
- Visual feedback

## 🎨 Styling

- Gradient color scheme (purple/blue)
- Card-based layout
- Responsive grid system
- Mobile-first approach
- CSS animations for smooth interactions

## 📱 Responsive Design

The application is fully responsive:
- Desktop: Grid layouts with multiple columns
- Tablet: Adjusted grid spacing
- Mobile: Single column layout

## 🛠 Technologies Used

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Chart library
- **CSS3** - Styling (no CSS framework)

## 🔄 Data Flow

```
LoginPage → AuthContext → localStorage (token)
                          ↓
                      API Interceptor
                          ↓
        DashboardPage ← API Requests
             ↓
         Components (TrackingListItem, ChartComponent)
```

## 🚨 Error Handling

- Network errors are caught and displayed as error banners
- 401 errors trigger automatic logout and redirect to login
- Form validation with helpful error messages
- Empty state when no data is found
- Loading states for better UX

## ⚡ Performance Optimizations

- Infinite scroll with intersection observer (lazy loading)
- useCallback hooks to prevent unnecessary re-renders
- Component memoization where appropriate
- Debounced API calls on search

## 📝 Demo Credentials

```
Email: john@example.com
Password: 123456
```

## 🎯 Future Enhancements

- Export data to CSV/PDF
- Advanced filters (date range, price range)
- User profile page
- Real-time notifications
- Dark mode
- Keyboard shortcuts
- Advanced analytics

## 📄 License

This project is part of an assignment.
