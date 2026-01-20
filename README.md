# Tracking App

A full-stack tracking application built with Node.js and React. This application allows users to track activities, view statistics through charts, and manage their data with authentication.

## 🧪 Mock Data

This project currently uses **mock data** for development and demonstration purposes.

- All tracking, chart, and statistics data are stored in in-memory / local mock files
- No real database is connected yet
- Data will be reset when the backend server restarts

The mock data can be found in: backend/data/

## 🎯 Features

- **Authentication System** - User login and registration with JWT-based authentication
- **Activity Tracking** - Track and manage activities with timestamps
- **Data Visualization** - View charts and statistics of tracked activities
- **User Dashboard** - Personalized dashboard for each user
- **Rating System** - Rate and review tracked items
- **Protected Routes** - Secure pages with authentication middleware

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React** 19.2.0
- **React Router** v7 for routing
- **Vite** for fast development and building
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **Axios** for API requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tracking app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (if needed) for environment variables.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3000` (or your configured port)

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📦 Project Structure

```
tracking app/
├── backend/
│   ├── controllers/          # Business logic
│   │   ├── auth.controller.js
│   │   ├── chart.controller.js
│   │   ├── health.controller.js
│   │   └── tracking.controller.js
│   ├── data/                 # Mock data
│   ├── middlewares/          # Custom middleware
│   ├── routes/               # API routes
│   ├── services/             # Service layer
│   ├── utils/                # Utility functions
│   ├── app.js                # Express app setup
│   └── server.js             # Server entry point
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── context/          # React context (Auth)
    │   ├── pages/            # Page components
    │   ├── services/         # API services
    │   ├── styles/           # CSS modules
    │   ├── App.jsx           # Main app component
    │   └── main.jsx          # Entry point
    ├── public/               # Static assets
    └── vite.config.js        # Vite configuration
```

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - Server health check

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Tracking
- `GET /api/trackings` - Get all activities
- `POST /api/trackings` - Create new activity
- `GET /api/trackings/:id` - Get activity by ID
- `PUT /api/trackings/:id` - Update activity
- `DELETE /api/trackings/:id` - Delete activity

### Chart/Statistics
- `GET /api/chart` - Get chart data
- `GET /api/chart/stats` - Get statistics

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
1. Users register or login
2. Server returns a JWT token
3. Token is stored in client-side storage
4. Token is sent with each request in the Authorization header
5. Protected routes verify the token before granting access

## 🎨 Pages

- **Login Page** (`/login`) - User authentication
- **Dashboard** (`/dashboard`) - Main application dashboard with tracking and charts

## 📱 Components

- **ChartComponent** - Displays charts using Recharts
- **RatingComponent** - Rating/review functionality
- **TrackingListItem** - Individual tracking item display
- **ProtectedRoute** - Route protection wrapper

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Punsakorn Aroonchote

## 📧 Contact

For support, email support@example.com or open an issue in the repository.


