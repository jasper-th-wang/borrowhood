# Borrowhood
A communal rental platform for sharing items and building connections. Built for nwHacks 2025 &lt;3 

## Local Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies for both frontend and backend:
```bash
# Install root project dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Development

To run both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Frontend development server
- Backend development server

### Building for Production

To build both frontend and backend:
```bash
npm run build
```

### Running in Production

To start the production server:
```bash
npm run start
```

This will serve the built frontend through the backend server.