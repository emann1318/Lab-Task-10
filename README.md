# FreelanceHub - FullStack Web Application

A professional freelance platform built with a full-stack architecture.

## Features
- **Browse Services**: Browse a dynamic list of freelance services.
- **Detailed View**: View more info about a specific service in a modal.
- **Search & Filter**: Search by title or filter by category.
- **Sort**: Sort by price or rating.
- **Save & Hire**: Drag and drop services into your dashboard to save or hire.
- **RESTful API**: Custom-built backend using Express.js.

## API Endpoints
- `GET /api/services`: Get all available services.
- `GET /api/services/:id`: Get details for a specific service.
- `POST /api/save`: Save a service (sends `{ id: Number }`).
- `POST /api/hire`: Hire a service (sends `{ id: Number }`).
- `GET /api/saved`: Get all saved services.
- `GET /api/hired`: Get all hired services.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the application with `npm run dev`.
4. Open your browser at `http://localhost:3000`.

## Tech Stack
- **Frontend**: HTML5, CSS, JavaScript.
- **Backend**: Node.js, Express.js.
- **Data**: JSON and in-memory storage.
