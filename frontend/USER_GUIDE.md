# Tracking Dashboard - User & Feature Guide

## Getting Started

### Step 1: Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Step 2: Login

1. Navigate to the login page
2. Use demo credentials:
   - **Email:** john@example.com
   - **Password:** 123456
3. Click "Login"

You'll be redirected to the Dashboard.

## Dashboard Features

### 1. Analytics Overview

At the top of the dashboard, you'll see:

**Pie Chart - Status Distribution**
- Visual representation of all trackings by status
- Shows breakdown: In Transit, Delivered, Delayed, Canceled, etc.

**Summary Cards**
- **Total Trackings:** Count of all items
- **Total Service Fee:** Sum of all service fees
- **Average Rating:** Average rating across all items

**Status Breakdown Table**
- Detailed count for each status type
- Color-coded status indicators

---

### 2. Search & Filter Controls

Located under the charts:

#### Search Bar
- Search by **Tracking ID** or **Item Name**
- Real-time filtering
- Example: Type "Closet" to find items with that name

#### Status Filter Dropdown
- Filter by specific status
- Options: All Statuses, In Transit, Delivered, Delayed, Canceled, Created
- Automatically updates when you select an option

#### Sort Options
- **Sort by Order Time** - Chronological by when item was ordered
- **Sort by Completed Time** - Chronological by completion
- **Sort by Service Fee** - By price (low to high)
- **Sort by Status** - Alphabetical by status
- **Sort by Name** - Alphabetical by item name

#### Sort Direction
- **↑** Button - Sort ascending (A-Z, low-high)
- **↓** Button - Sort descending (Z-A, high-low)

---

### 3. Tracking Items List

Each tracking item is displayed as a card showing:

**Collapsed View (Default)**
```
#123 | Item Name | [Delivered] | ฿500
```

- **Tracking ID:** Unique identifier (#number)
- **Item Name:** Name of the tracked item
- **Status Badge:** Color-coded status indicator
- **Service Fee:** Cost in Thai Baht (฿)
- **Expand Arrow:** Click to expand and see details

**Expanded View**

Click on any tracking card to expand and see:

1. **Order Time**
   - When the item was ordered
   - Format: Day Mon Date, Year at Time

2. **Completed Time**
   - When the item was delivered/completed
   - Format: Day Mon Date, Year at Time

3. **Duration**
   - How long the item took
   - Shows in days and hours (e.g., "5d 3h")

4. **Rating Section**
   - 5-star rating system
   - Click stars to rate (1-5)
   - Only 1 vote per user per item
   - Once voted, you can't change it
   - Shows "Voted: X/5" after rating

---

### 4. Status Types & Colors

| Status | Color | Meaning |
|--------|-------|---------|
| Created | Purple | Item just created |
| In Transit | Blue | Currently being shipped |
| Delivered | Green | Successfully delivered |
| Delayed | Yellow | Running behind schedule |
| Canceled | Red | Order was canceled |

---

### 5. Infinite Scroll / Pagination

- Trackings are loaded 10 at a time
- As you scroll to the bottom, more items automatically load
- Loading spinner appears while fetching
- "No more trackings to load" message appears at the end
- Combine search/filter/sort options with scrolling for targeted results

---

## Common Tasks

### How to Find a Specific Item

**Option 1: Search**
1. Type the item name or tracking ID in the search bar
2. Results update instantly

**Option 2: Filter by Status**
1. Select status from the filter dropdown
2. Only items with that status appear

**Option 3: Combine Search + Filter**
1. Type a search term
2. Also select a status filter
3. Shows only matching items with that status

### How to Rate an Item

1. Find the tracking item in the list
2. Click on it to expand the card
3. Scroll down to the "Rate this tracking" section
4. Click on the desired number of stars (1-5)
5. Stars turn gold when you vote
6. The rating is immediately submitted

### How to Sort Results

1. Choose a sort option from the "Sort by..." dropdown:
   - Order Time (when it was created)
   - Completed Time (when it finished)
   - Service Fee (by price)
   - Status (alphabetical)
   - Name (alphabetical)

2. Click the ↑↓ button to change direction:
   - ↑ = Ascending (A-Z, oldest-first, low-high)
   - ↓ = Descending (Z-A, newest-first, high-low)

### How to Logout

1. Click the **Logout** button in the top-right corner
2. Confirm the logout
3. You'll be redirected to the login page

---

## UI States & What They Mean

### Loading State
```
[Spinner] Loading trackings...
```
The app is fetching data from the server. Wait for it to complete.

### Empty State
```
📦
No trackings found
Try adjusting your search filters
```
No items match your current search/filter combination. Try:
- Clearing the search box
- Changing the status filter
- Resetting filters

### Error State
```
Failed to load trackings
```
Something went wrong with the API request. Try:
- Refreshing the page
- Checking your internet connection
- Ensuring the backend server is running

### Loading More (Infinite Scroll)
```
[Spinner] Loading more...
```
The app is fetching the next page of results. Keep scrolling when ready.

---

## Tips & Tricks

### Search Tips
- Search is case-insensitive
- Partial matches work (type "clo" to find "Closet")
- Search works on both ID and name

### Performance Tips
- For large datasets, combine search + filter + sort
- This reduces the number of items shown
- Makes scrolling smoother

### Rating Tips
- Your rating affects the "Average Rating" shown in charts
- Everyone can see the average
- You can only rate once per item
- Take time before rating as you can't change it

### Mobile Tips
- The dashboard is mobile-responsive
- On small screens, cards stack vertically
- Touch-friendly star rating
- Filters reorganize for mobile view

---

## Data Displayed

### Tracking Item Fields
| Field | Example | Description |
|-------|---------|-------------|
| ID | #1 | Unique identifier |
| Name | Closet | Item/project name |
| Status | In Transit | Current status |
| Order Time | Jan 14, 2026 10:00 | When ordered |
| Completed Time | Jan 18, 2026 15:30 | When completed |
| Duration | 4d 5h | Total time taken |
| Service Fee | ฿100 | Cost to ship/process |
| Rating | ★★★★☆ 4 | Your rating (1-5) |

### Chart Data
| Metric | Description |
|--------|-------------|
| Total Trackings | Count of all items in system |
| Status Summary | Breakdown by each status |
| Total Service Fee | Sum of all fees |
| Average Rating | Mean of all user ratings |

---

## Keyboard & Navigation

- **Tab** - Navigate between form fields
- **Enter** - Submit search/filter
- **Arrow Keys** - Scroll through list (if focused)
- **Click** - Expand/collapse tracking cards
- **Star Click** - Submit rating

---

## Troubleshooting

### Items Don't Load
- ✓ Check backend server is running at http://localhost:3000
- ✓ Verify login token is valid (try logging out and back in)
- ✓ Check browser console for error messages (F12)

### Rating Doesn't Submit
- ✓ Ensure you're logged in
- ✓ Check if you already voted (you can only vote once)
- ✓ Try refreshing to load updated ratings

### Search Not Working
- ✓ Ensure you're not logged out
- ✓ Check the search query is spelled correctly
- ✓ Try clearing filters to see all items

### Can't Logout
- ✓ Click Logout button again
- ✓ Close browser tab and reopen app

### Page Appears Blank
- ✓ Refresh the page (Ctrl+R)
- ✓ Clear browser cache (Ctrl+Shift+Delete)
- ✓ Check browser console for errors (F12)

---

## Browser Compatibility

Works best on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Responsive on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

---

## Demo Walkthrough

1. **Login** with john@example.com / 123456
2. **View Charts** - See the overview of all trackings
3. **Search** - Type "Closet" to find that item
4. **Filter** - Select "Delivered" status
5. **Sort** - Click "Sort by Service Fee" and ↓
6. **Expand** - Click a tracking card to see details
7. **Rate** - Click stars to rate the item
8. **Scroll** - Scroll down to load more items
9. **Logout** - Click logout button

---

## Feedback & Issues

If you encounter any issues or have feature requests:
1. Check the troubleshooting section above
2. Check browser console (F12 → Console tab)
3. Verify backend API is running
4. Refresh the page
5. Contact development team with screenshots/errors
