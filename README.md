# DashboardApp2

This project is a simple React and TypeScript dashboard built with Vite and Tailwind CSS.

The interface supports a light and dark theme. Use the sun/moon button in the header to toggle between modes. Your preference is saved in `localStorage`.

## Prerequisites

- Node.js (version 18 or later)

## Installation

Install the dependencies:

```bash
npm install
```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

Run the linter:

```bash
npm run lint
```

## Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Single Sign-On

This project now includes a Microsoft single sign-on (SSO) flow using MSAL.  
When the app starts, unauthenticated users see a dedicated login page with a **"Sign in with Microsoft"** button.  
Make sure to update `src/authConfig.ts` with your **Azure application client ID** before running the app.
