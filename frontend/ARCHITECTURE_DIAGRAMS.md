# 🎨 Visual Architecture & Flow Diagrams

## Application Architecture

```
┌─────────────────────────────────────────────────────┐
│                    TRACKING DASHBOARD                │
│                   React + Vite + Axios               │
└─────────────────────────────────────────────────────┘
           │
           ├── src/
           │   ├── pages/
           │   │   ├── LoginPage.jsx ─────────┐
           │   │   └── DashboardPage.jsx ──┐   │
           │   │                             │   │
           │   ├── components/               │   │
           │   │   ├── ProtectedRoute.jsx ◄─┼───┤
           │   │   ├── TrackingListItem.jsx◄┘   │
           │   │   ├── ChartComponent.jsx   │   │
           │   │   └── RatingComponent.jsx  │   │
           │   │                             │   │
           │   ├── context/                  │   │
           │   │   └── AuthContext.jsx ◄────┴───┤
           │   │                             │   │
           │   ├── services/                 │   │
           │   │   └── api.js (Axios) ◄─────┴───┼──┐
           │   │                                │  │
           │   └── styles/                     │  │
           │       └── *.css                  │  │
           │                                  │  │
           ├── App.jsx (Router)              │  │
           └── main.jsx (Entry Point)        │  │
                                             │  │
                    ┌────────────────────────┘  │
                    │                           │
         ┌──────────▼───────────┐   ┌───────────▼──────┐
         │   BACKEND API        │   │  BROWSER CACHE   │
         │  (localhost:3000)    │   │  (localStorage)  │
         ├──────────────────────┤   ├──────────────────┤
         │ POST /auth/login     │   │ Bearer Token     │
         │ GET /trackings       │   │ User Session     │
         │ POST /:id/vote       │   │ Data Cache       │
         │ GET /chart/summary   │   └──────────────────┘
         └──────────────────────┘
```

## Authentication Flow

```
User          Browser          API         localStorage
  │              │              │              │
  ├─ Enter Email─→            │              │
  ├─ Enter Pass ─→            │              │
  │              │              │              │
  └─ Click Login ───────────→ POST /auth/login
                 │              │
                 │ ◄───────── Token + User
                 │              │
                 │              │──────────────→ Save Token
                 │              │              │
  ◄──────────────┴──────────── Redirect to /dashboard
                 │
            Login Page
                 ↓
            Dashboard Page
```

## Component Hierarchy

```
App (Router)
│
├── AuthProvider (Context)
│   │
│   └── Routes
│       │
│       ├── Route: /login
│       │   └── LoginPage
│       │       ├── Email Input
│       │       ├── Password Input
│       │       ├── Login Button
│       │       └── Demo Credentials
│       │
│       ├── Route: /dashboard
│       │   └── ProtectedRoute
│       │       └── DashboardPage
│       │           ├── Header
│       │           │   ├── Title
│       │           │   └── Logout Button
│       │           │
│       │           ├── ChartComponent
│       │           │   ├── Pie Chart
│       │           │   ├── Stat Cards
│       │           │   └── Status Breakdown
│       │           │
│       │           ├── Controls Section
│       │           │   ├── Search Input
│       │           │   ├── Status Filter
│       │           │   ├── Sort Dropdown
│       │           │   └── Sort Direction
│       │           │
│       │           └── Trackings List
│       │               ├── TrackingListItem (×n)
│       │               │   ├── Item Header
│       │               │   │   ├── ID & Name
│       │               │   │   ├── Status Badge
│       │               │   │   └── Service Fee
│       │               │   │
│       │               │   └── Item Details (Expanded)
│       │               │       ├── Dates
│       │               │       ├── Duration
│       │               │       └── RatingComponent
│       │               │
│       │               ├── Loading More Indicator
│       │               └── End of List Message
│       │
│       └── Route: /* → Redirect to /dashboard
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERACTION                      │
└─────────────────────────────────────────────────────────┘
              │
              ├─────→ Login Form ────→ POST /api/auth/login
              │           │                    │
              │           └────→ [Save Token]──┘
              │
              ├─────→ Search Input ─────────┐
              │                             │
              ├─────→ Filter Dropdown ──────┤─→ GET /api/trackings
              │                             │   (with query params)
              ├─────→ Sort Control ────────┤
              │                             │
              └─────→ Page Scroll ─────────┘
                           │
                           ▼
                   [Intersection Observer]
                           │
                           └──→ Fetch Next Page
                                      │
                                      ▼
                          [Append to Existing List]
                                      │
    ┌──────────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  Display Tracking Items     │
│ (TrackingListItem Component)│
└─────────────────────────────┘
    │
    ├──→ Click to Expand ────→ Show Details
    │
    └──→ Click Star ────→ POST /api/trackings/:id/vote
                            │
                            └──→ Get Updated Summary
                                    │
                                    ▼
                            Update Charts
```

## State Management Structure

```
App
│
├── AuthContext
│   ├── user (object)
│   ├── token (string)
│   ├── isAuthenticated (boolean)
│   ├── isLoading (boolean)
│   ├── error (string)
│   ├── login() function
│   └── logout() function
│
├── DashboardPage (Local State)
│   ├── trackings (array)
│   ├── summary (object)
│   ├── isLoading (boolean)
│   ├── error (string)
│   ├── searchQuery (string)
│   ├── statusFilter (string)
│   ├── sortBy (string)
│   ├── sortOrder (string)
│   ├── page (number)
│   ├── hasMore (boolean)
│   └── isLoadingMore (boolean)
│
└── TrackingListItem (Local State)
    └── isExpanded (boolean)
```

## API Request Flow

```
User Action
    │
    ▼
Component (DashboardPage, etc.)
    │
    ▼
API Service (src/services/api.js)
    │
    ├── Add Authorization Header
    │   (Request Interceptor)
    │
    ├── GET/POST/PUT request
    │   with parameters
    │
    ▼
Backend API
(http://localhost:3000/api/...)
    │
    ▼
Response
    │
    ├── Check Status Code
    │   (Response Interceptor)
    │
    ├── If 401 → Logout & Redirect
    │
    ├── If Error → Return error object
    │
    └── If Success → Return data
            │
            ▼
    Component State Updated
            │
            ▼
    Component Re-renders
```

## Routing Map

```
localhost:5173
│
├── / ──────────────→ Redirect to /dashboard
│
├── /login ─────────→ LoginPage
│   │
│   ├── (Not Authenticated)
│   │   └── Show Login Form
│   │
│   └── (Authenticated)
│       └── Redirect to /dashboard
│
├── /dashboard ────→ ProtectedRoute
│   │
│   ├── (Not Authenticated)
│   │   └── Redirect to /login
│   │
│   └── (Authenticated)
│       └── DashboardPage
│           ├── Charts
│           ├── Controls
│           └── Tracking List
│
└── /* ─────────────→ Redirect to /dashboard
```

## Search/Filter/Sort Flow

```
User Input
    │
    ├─ Types in Search ─────┐
    │                        │
    ├─ Changes Filter ───────┤──→ Set Local State
    │                        │    (searchQuery, statusFilter, etc.)
    ├─ Changes Sort ────────┤
    │                        │
    └─ Clicks Sort Order ───┘
            │
            ▼
    useEffect Dependency Array Triggers
            │
            ▼
    fetchTrackings() Called
            │
            ├─ Build Query Params:
            │  {
            │    page: 1,
            │    search: searchQuery,
            │    status: statusFilter,
            │    sortBy: sortBy,
            │    sortOrder: sortOrder
            │  }
            │
            ▼
    API Call: GET /api/trackings?...
            │
            ▼
    Response with filtered/sorted data
            │
            ▼
    Set Trackings State
            │
            ▼
    Component Re-renders with New Data
```

## Infinite Scroll Mechanism

```
Page Load
    │
    ├─ Fetch Page 1 (10 items)
    │
    ▼
Display Items
    │
    └─ Attach Intersection Observer to bottom sentinel
            │
            ├─ User Scrolls Down
            │
            ▼
    Sentinel Element Enters Viewport
            │
            ├─ Intersection Observer Triggers
            │
            ├─ Check: hasMore && !isLoadingMore && !isLoading
            │
            ▼
    Fetch Page 2 (10 items)
            │
            ▼
    Append to Existing List (20 items total)
            │
            ▼
    Re-attach Sentinel to New Bottom
            │
    [Repeat for each page...]
            │
            ▼
    Last Page Returns < 10 Items
            │
            ▼
    hasMore = false
            │
            ▼
    Show "No More Items" Message
```

## CSS Styling Architecture

```
index.css (Global)
    │
    ├── * Reset
    ├── body Styles
    ├── General Element Styles
    └── Font & Color Defaults
            │
            ▼
App.css (App Level)
    │
    ├── #root Container
    ├── Loading States
    └── Global App Layout
            │
            ▼
Component CSS Files (Specific)
    │
    ├── LoginPage.css ──→ Login styling
    ├── DashboardPage.css ──→ Dashboard layout
    ├── TrackingListItem.css ──→ Item cards
    ├── ChartComponent.css ──→ Charts
    └── RatingComponent.css ──→ Stars
            │
            ▼
Responsive Breakpoints:
    ├── 320px (Mobile)
    ├── 768px (Tablet)
    └── 1024px (Desktop)
```

## Error Handling Strategy

```
API Request
    │
    ├─ Try
    │   ├─ Make request
    │   └─ Parse response
    │
    └─ Catch Error
            │
            ├─ Network Error
            │   └─ Show: "Network failed"
            │
            ├─ 401 Unauthorized
            │   ├─ Clear token
            │   ├─ Clear user
            │   └─ Redirect to /login
            │
            ├─ 400 Bad Request
            │   └─ Show: Error message from API
            │
            ├─ 500 Server Error
            │   └─ Show: "Server error, try again"
            │
            └─ Timeout
                └─ Show: "Request timed out"
```

## Performance Optimization Strategy

```
Rendering
    │
    ├─ useCallback for API calls
    │   └─ Prevents unnecessary re-renders
    │
    ├─ Lazy loading with Intersection Observer
    │   └─ Only load when needed
    │
    ├─ CSS Animations (GPU accelerated)
    │   └─ Smooth performance
    │
    └─ Efficient API Requests
        └─ Only fetch what's needed
```

## Color Scheme

```
Primary: #667eea (Purple-Blue)
Secondary: #764ba2 (Purple)
Success: #00C49F (Green) ─────→ Delivered
Info: #0088FE (Blue) ──────────→ In Transit
Warning: #FFBB28 (Yellow) ─────→ Delayed
Danger: #FF8042 (Orange/Red) ──→ Canceled
Neutral: #8884D8 (Light Blue) ─→ Created
Text: #333 (Dark Gray)
Light: #f8f9fa (Off White)
Border: #ddd (Light Gray)
```

This visual architecture provides a complete overview of how all components, services, and data flows work together in the Tracking Dashboard application.
