# TeamSync

**Plan Together. Work Smarter. Achieve More.**

A modern project management platform built with React.

## Project Structure

```
TeamSync/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/     # Reusable UI components
│   │   │   ├── layout/     # App layout (Sidebar, TopNav)
│   │   │   ├── modals/     # Modal dialogs
│   │   │   └── views/      # Page views
│   │   ├── data/           # Mock data
│   │   ├── styles/         # Global styles
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Backend API (future)
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Backend
> Backend is not yet implemented. See [backend/README.md](backend/README.md).

## Tech Stack

### Frontend
- React 18
- Vite 5
- Lucide React (icons)
- Recharts (charts)
- CSS (custom design system)

### Backend (Planned)
- Node.js / Express
- Database (TBD)

## Features
- Dashboard with analytics and activity feed
- Project workspace with Kanban board
- Drag-and-drop task management
- Task detail modal with comments
- Team member management
- Notifications system
- Settings panel
