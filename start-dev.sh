#!/bin/bash

# Set the PATH to include Node.js
export PATH="/usr/local/bin:$PATH"

# Start the backend in development mode
cd backend
npm install
npm run dev &

# Start the frontend in development mode
cd ../frontend
npm install
npm run dev

# Keep the script running
wait
