# 🚀 Quick Start Guide

## Prerequisites
- Node.js v14 or higher
- Backend API running at http://localhost:3000
- Modern web browser

## Installation & Running

### 1. Install Dependencies
```bash
cd d:\assignment\tracking app\frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Server will start at: **http://localhost:5173**

### 3. Open in Browser
Navigate to `http://localhost:5173/` - you'll be redirected to login page

## Login

**Demo Credentials:**
```
Email: john@example.com
Password: 123456
```

## What You'll See

1. **Login Page** - Authenticate with email/password
2. **Dashboard** - Overview of all tracking items
3. **Charts** - Analytics showing status distribution
4. **Search & Filter** - Find items you need
5. **Tracking List** - Expandable cards with details
6. **Rating** - Rate items with 5-star system

## Key Features at a Glance

✅ **Search** - Find by tracking ID or name  
✅ **Filter** - By status  
✅ **Sort** - By date, fee, status, or name  
✅ **Rate** - 5-star rating system  
✅ **Charts** - Analytics and statistics  
✅ **Infinite Scroll** - Load more as you scroll  
✅ **Responsive** - Works on mobile, tablet, desktop  
✅ **Auth** - Secure token-based access  

## Common Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── pages/           # Login & Dashboard pages
├── components/      # Reusable UI components
├── services/        # API client
├── context/         # Auth state management
└── styles/          # Component CSS
```

## Documentation

- **PROJECT_SETUP.md** - Detailed setup & architecture
- **API_INTEGRATION_GUIDE.md** - API endpoints & examples
- **USER_GUIDE.md** - Feature walkthrough
- **FILE_STRUCTURE.md** - Complete file listing

## API Integration

All API requests automatically include Bearer token authentication. Endpoints configured:

- `POST /api/auth/login` - Login
- `GET /api/trackings` - Fetch items (with search/filter/sort)
- `POST /api/trackings/:id/vote` - Rate item
- `GET /api/chart/summary` - Get analytics

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5173 in use | Change port or kill process |
| API connection error | Ensure backend running at :3000 |
| Login fails | Check credentials (john@example.com / 123456) |
| Items don't load | Check browser console for errors (F12) |
| No charts | Refresh page or check API response |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Next Steps

1. ✅ Backend must be running at http://localhost:3000
2. ✅ Run `npm install` to install dependencies
3. ✅ Run `npm run dev` to start dev server
4. ✅ Open http://localhost:5173 in browser
5. ✅ Login with demo credentials
6. ✅ Explore the dashboard!

## Tips

- 💡 Use search for quick lookups
- 💡 Combine filters for precise results
- 💡 Sort by service fee to see pricing
- 💡 Rate items to improve analytics
- 💡 Charts update in real-time

## Need Help?

Check the documentation files:
1. PROJECT_SETUP.md - Setup issues
2. API_INTEGRATION_GUIDE.md - API problems
3. USER_GUIDE.md - Feature questions
4. Browser console (F12) - Error details

## Performance Tips

- Search is instant and case-insensitive
- Infinite scroll loads 10 items at a time
- Filters + sort reduce data transferred
- Charts cache data locally
- Star ratings update immediately

---

**Ready?** Run `npm run dev` and start tracking! 🎯
