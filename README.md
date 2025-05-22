node --version
npm --versionecho 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"# Melbourne and Wine School

A modern web application for Melbourne and Wine School, featuring:
- Frontend: Next.js with Tailwind CSS
- Backend: Node.js with Express/NestJS

## Project Structure

```
melbourne-wine-school/
├── frontend/           # Next.js frontend application
└── backend/            # Node.js backend application
```

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or yarn
- Git

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Set up environment variables (create a `.env` file based on `.env.example`)
4. Start the development server:
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```
5. The API will be available at [http://localhost:3001](http://localhost:3001)

## Development

### Git Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them
3. Push your changes and create a pull request

## License

This project is proprietary and confidential.

---

**Melbourne and Wine School** © 2025
