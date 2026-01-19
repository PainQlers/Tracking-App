# 🎯 Tracking Dashboard - Frontend

A comprehensive React + Vite web application for real-time tracking management with advanced search, filtering, sorting, rating system, and analytics dashboard.

## ✨ Features

- **Authentication** - Secure login with Bearer token
- **Real-time Tracking** - Live tracking item management
- **Smart Search** - Search by ID or name
- **Advanced Filtering** - Filter by status
- **Flexible Sorting** - Multiple sort options
- **Rating System** - 5-star rating (1 vote per user)
- **Analytics Dashboard** - Charts and statistics
- **Infinite Scroll** - Automatic lazy loading
- **Responsive Design** - Mobile to desktop
- **Error Handling** - Comprehensive error management

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- Backend API at http://localhost:3000

### Installation
```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser

### Demo Login
```
Email: john@example.com
Password: 123456
```

## 📚 Documentation

Complete documentation is available:

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | Get started in 5 minutes |
| [PROJECT_SETUP.md](PROJECT_SETUP.md) | Detailed setup & features |
| [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) | API endpoints & examples |
| [USER_GUIDE.md](USER_GUIDE.md) | Feature walkthrough |
| [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) | Visual architecture |
| [FILE_STRUCTURE.md](FILE_STRUCTURE.md) | File organization |
| [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) | Documentation guide |

👉 **Start here:** [QUICK_START.md](QUICK_START.md)

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Auth state management
│   ├── pages/            # Page components
│   ├── services/         # API client
│   ├── styles/           # Component CSS
│   ├── App.jsx          # Main app
│   └── main.jsx         # Entry point
├── public/              # Static files
├── package.json         # Dependencies
└── vite.config.js      # Vite config
```

## 🔑 Key Features

### 1. Search & Filter
- Search by tracking ID or name
- Filter by status
- Real-time results

### 2. Sorting
- Sort by date, fee, status, or name
- Ascending/descending toggle

### 3. Rating System
- 5-star interactive rating
- One vote per user per item
- Updates analytics in real-time

### 4. Analytics
- Status distribution pie chart
- Summary statistics
- Total fees and ratings

### 5. Pagination
- Infinite scroll with lazy loading
- Automatic data fetching
- Smooth performance

## 🔌 API Integration

Connected to backend at `http://localhost:3000`:

- `POST /api/auth/login` - Authentication
- `GET /api/trackings` - Fetch items
- `POST /api/trackings/:id/vote` - Submit rating
- `GET /api/chart/summary` - Get analytics

See [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) for details.

## 💻 Available Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Check code
```

## 🛠 Technologies

- React 19.2
- React Router 6
- Axios
- Recharts
- Vite 7
- CSS3

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Use Cases

- Track shipments
- Monitor project status
- Rate and review items
- Analyze trends
- Manage large datasets

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't connect | Ensure backend runs at :3000 |
| Login fails | Check credentials |
| No data loads | Verify API is running |
| Port in use | Change port in vite.config.js |

See [USER_GUIDE.md](USER_GUIDE.md) for more help.

## 📖 Learn More

- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Navigation guide
- [PROJECT_SETUP.md](PROJECT_SETUP.md) - Architecture overview
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) - Visual diagrams

## ✅ Status

- ✅ All features implemented
- ✅ Production ready
- ✅ Fully documented
- ✅ Error handling complete
- ✅ Responsive design
- ✅ Performance optimized

## 📄 License

This project is part of an assignment.

---

**Ready to start?** Run `npm run dev` and visit http://localhost:5173 🚀
