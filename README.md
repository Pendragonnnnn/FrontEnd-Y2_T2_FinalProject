# Scholar — Smart Assignment Tracker

A lightweight academic planner with intelligent behaviour. Built with React + Vite.

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
scholar/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component & state
    ├── App.module.css
    ├── index.css             # Global CSS variables
    ├── utils/
    │   ├── helpers.js        # Constants, getPriority, formatters
    │   ├── useAssignments.js # All assignment CRUD + localStorage
    │   └── usePomodoro.js    # Pomodoro timer logic
    └── components/
        ├── Topbar            # Search bar, add button
        ├── Sidebar           # Navigation, progress bar
        ├── AssignmentCard    # Individual card with progress slider
        ├── ListView          # Filters + cards grid
        ├── CalendarView      # Monthly calendar
        ├── StatsView         # Charts & statistics
        ├── PremiumView       # Pomodoro + Random picker (gated)
        └── AddModal          # Add / edit assignment form
```

## Features

### Core (Person 1)
- Add assignments: title, subject, due date, difficulty, schedule
- Live countdown to deadline
- Priority color system: Urgent / Upcoming / Future / Completed / Overdue
- Per-card progress slider

### Calendar (Person 2)
- Monthly calendar view with assignments on due dates
- Navigate months with arrows

### Statistics (Person 2)
- Bar chart: assignments per subject
- Donut chart: status breakdown
- Stat cards: total, completed, urgent, overdue, completion rate, avg progress

### Premium (Person 3)
- Gated behind a free unlock
- Pomodoro Timer with animated ring, 3 modes, audio chime, cycle counter
- Random Assignment Picker from active pool

### Power Features (Person 4)
- File attachment (stores filename locally)
- Full localStorage persistence
- Search + 3-way filter (subject, status, difficulty)
- Auto-delete completed assignments 30 days past due
- Mark complete with strikethrough
