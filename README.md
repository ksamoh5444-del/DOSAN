# Dosan — Mobile-First Daily Dashboard

A sleek, installable PWA dashboard for daily productivity: tasks, budget, goals, water intake, and mood — built mobile-first for iPhone screen sizes.

## Features

- **Tasks Tracker** — daily to-do list with pending/done status and completion metrics.
- **Money** — quick expense logging by category, monthly budget limit vs. spent, 7-day spending trend and category breakdown charts.
- **Goals** — habit/goal tracker with visual progress bars and an overview chart.
- **Wellness** *(AI-suggested modules)* — daily water intake tracker and a 5-point mood check-in with a weekly trend chart.
- **Home** — at-a-glance dashboard summarizing every module.

## Design & UX

- Sleek, minimal UI with full Dark Mode support (system-aware, manually toggleable).
- Mobile-first, touch-friendly layout: bottom tab navigation + floating action buttons.
- Interactive charts via [Recharts](https://recharts.org).
- All data persists locally via `localStorage` — no backend required.
- Installable as a PWA (Add to Home Screen) with offline support via a service worker, including an iOS-specific install hint.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Recharts
- vite-plugin-pwa

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Project Structure

```
src/
  components/     # UI components grouped by feature (tasks, expenses, goals, water, mood, common, layout)
  hooks/          # localStorage-backed data hooks + theme hook
  pages/          # top-level pages (Home, Tasks, Money, Goals, Wellness)
  lib/            # date/currency/formatting utilities
  types.ts        # shared data models
```
