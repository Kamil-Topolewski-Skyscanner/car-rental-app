# Car Rental Frontend

A modern, responsive car rental application built with React, TypeScript, and modern web technologies.

## Features

- 🚗 Browse and filter available cars
- 📅 Real-time availability checking
- 🔍 Search functionality
- 📱 Responsive design for all devices
- 🔒 Form validation
- 💾 Persistent state management
- ⚡ Optimized performance

## Tech Stack

- React 18+
- TypeScript 5.0+
- CSS Modules
- React Testing Library & Jest
- Playwright for E2E testing
- React Router for navigation
- Vite for build tooling

## Prerequisites

- Node.js 18+
- npm 8+ or yarn 1.22+

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Kamil-Topolewski-Skyscanner/car-rental-app.git
   cd car-rental-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_CARS_API_URL=http://localhost:8080
   VITE_RESERVATIONS_API_URL=http://localhost:8081
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit and integration tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── cars/
│   │   │   ├── CarList/
│   │   │   ├── CarCard/
│   │   │   └── CarDetails/
│   │   └── reservation/
│   │       └── ReservationForm/
│   ├── context/
│   │   ├── CarsContext.tsx
│   │   └── ReservationContext.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   ├── carService.ts
│   │   └── reservationService.ts
│   ├── utils/
│   │   └── storage.ts
│   └── styles/
│       └── animations.css
├── tests/
│   ├── integration/
│   └── e2e/
└── public/
    └── images/
```

## Testing

The application includes three levels of testing:

1. Unit Tests:
   - Component-level tests
   - Service layer tests
   - Context providers tests

2. Integration Tests:
   - API service integration
   - Component interactions
   - State management

3. End-to-End Tests:
   - Complete user flows
   - Car browsing and filtering
   - Reservation process

Run tests:
```bash
# Unit and integration tests
npm run test

# End-to-end tests
npm run test:e2e
```

## Development Guidelines

1. Code Style:
   - Follow TypeScript best practices
   - Use functional components with hooks
   - Implement proper error handling
   - Write meaningful tests
   - Use CSS Modules for styling

2. State Management:
   - Use context for global state
   - Implement proper data persistence
   - Handle loading and error states

3. Performance:
   - Implement code splitting
   - Optimize images
   - Use lazy loading
   - Monitor bundle size

## Available APIs

The frontend interacts with two backend services:

1. Cars Service (`:8080`):
   - GET `/cars` - List all cars
   - GET `/cars?type={type}` - Filter by type
   - GET `/cars/{id}` - Get car details
   - GET `/cars/{id}/availability` - Check availability

2. Reservations Service (`:8081`):
   - POST `/reservations` - Create reservation
   - GET `/reservations?email={email}` - Get user reservations
   - GET `/reservations/{id}` - Get reservation details
   - DELETE `/reservations/{id}` - Cancel reservation

## Deployment

Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Create a pull request

## License

MIT License - see LICENSE file for details
