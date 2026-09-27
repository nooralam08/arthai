# ArthAI 🌿

> **Financial clarity, made simple.**

ArthAI is a real-world, beginner-friendly personal finance web application designed to help individuals understand, track, and optimize their personal finances with ease.

---

## Current Phase

**Phase 1: Project Foundation Only**

This phase establishes a clean, decoupled full-stack TypeScript architecture containing:
- A React + TypeScript frontend powered by Vite and Tailwind CSS.
- An Express + TypeScript backend with a health check endpoint (`/api/health`).
- A development proxy connecting frontend requests to the backend server.
- Monorepo folder organization ready for future modular expansion.

> **Note:** Application features (authentication, database, AI money mentors, financial calculators, and dashboards) are not implemented in Phase 1 and will be introduced in subsequent phases.

---

## Tech Stack

### Frontend (`client/`)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)

### Backend (`server/`)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Execution & Hot Reload:** [tsx](https://github.com/privatenumber/tsx)
- **Utilities:** `cors`, `dotenv`

---

## Project Structure

```text
arthai/
├── client/              # React frontend application
│   ├── public/          # Static assets
│   ├── src/             # Frontend source code (App, components, API client)
│   │   ├── api/         # API utilities (e.g. checkBackendHealth)
│   │   ├── App.tsx      # Main application view
│   │   ├── index.css    # Tailwind CSS imports and global styling
│   │   └── main.tsx     # React application entry point
│   ├── index.html       # HTML entry point
│   ├── package.json     # Client dependencies and scripts
│   ├── tsconfig.json    # TypeScript configurations
│   └── vite.config.ts   # Vite configuration with Tailwind and API proxy
├── server/              # Express backend application
│   ├── src/             # Backend source code
│   │   └── index.ts     # Express server setup and /api/health route
│   ├── .env.example     # Template for server environment variables
│   ├── package.json     # Server dependencies and scripts
│   └── tsconfig.json    # Backend TypeScript configuration
├── tests/               # Test suites (for future integration / E2E tests)
├── docs/                # Architecture notes and guides
├── .gitignore           # Git ignore rules for node_modules, build outputs, and env files
├── package.json         # Root monorepo workspace configuration and root scripts
└── README.md            # Project documentation and quickstart
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### Installation

From the project root directory, install dependencies for both client and server:

```bash
# Using root workspaces:
npm install

# Or install each workspace individually:
cd client && npm install
cd ../server && npm install
```

---

## How to Run

The client and server run as independent processes. Open two terminal windows or use root scripts:

### 1. Run the Backend Server

```bash
# Option A: From the server directory
cd server
npm run dev

# Option B: From the root directory
npm run dev:server
```

The server will start at:
- **URL:** [http://localhost:5000](http://localhost:5000)
- **Health check endpoint:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 2. Run the Frontend Client

```bash
# Option A: From the client directory
cd client
npm run dev

# Option B: From the root directory
npm run dev:client
```

The client will start at:
- **URL:** [http://localhost:5173](http://localhost:5173)

### 3. Verify Connection

Open [http://localhost:5173](http://localhost:5173) in your browser:
- You should see the **ArthAI** title and the tagline **"Financial clarity, made simple."**
- The backend status badge will indicate **"Connected"** with the message **"ArthAI API is running"**.

---

## Building for Production

```bash
# Build both client and server from root:
npm run build

# Or build individually:
# Client build:
cd client && npm run build
# Server build:
cd server && npm run build
```
