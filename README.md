# DataHeavy App – Frontend Assignment

## Overview

This is a React 19 + TypeScript project implementing a **Virtualized Infinite List** with **Advanced Filters, Search, Derived Statistics, and Comparison Mode**.

The assignment demonstrates **modern React best practices** including hooks, memoization, virtualized lists, and URL-driven filters.

---

## 🚀 Implemented Features

- Virtualized infinite list for fast rendering of large data
- Debounced search with minimal re-renders
- Advanced filtering (category multi-select, status, date range)
- Filters synced with URL parameters
- Apply and Clear filters actions
- Efficient memoized filtering logic
- Real-time derived statistics (total, averages, grouped counts)
- Comparison mode (select up to 3 items)


## 📦 Installed Packages

### Dependencies

- react - react-dom (Core React library)
- @tanstack/react-virtual (for Virtualized scrolling for large lists)
- react-router-dom (for URL management and filters in search params)
- react-select ( Multi-select dropdown for categories )
- tailwindcss( Styling framework )
- Lucide React (for icons)

## Setup and Run

1. Clone the repository:
   ```bash
   git clone https://github.com/lilas-apollo/dataheavy-app
   npm install
   npm run dev
   ```
