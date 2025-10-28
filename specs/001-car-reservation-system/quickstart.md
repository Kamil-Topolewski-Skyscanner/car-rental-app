# Car Rental Frontend - Quickstart Guide

## Prerequisites
- Node.js 18 or higher
- npm 8 or higher
- Backend services running (`cars-service` and `reservation-service`)

## Setup

1. Clone the repository and navigate to the frontend directory
```bash
git clone https://github.com/Kamil-Topolewski-Skyscanner/car-rental-app.git
cd car-rental-app/frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

### Project Structure
```
frontend/           # Frontend application root
├── src/
│   ├── components/ # Shared UI components
│   ├── features/  # Feature-specific components
│   ├── services/  # API integration
│   ├── utils/     # Shared utilities
│   └── types/     # TypeScript types
└── public/
    └── images/    # Static assets
        └── cars/  # Car images
```

### Key Files
- `src/services/api.ts` - API integration
- `src/features/cars/CarList.tsx` - Car listing component
- `src/features/reservations/ReservationForm.tsx` - Reservation form

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Backend Integration
The frontend expects two backend services:
- Cars Service: `http://localhost:8080`
- Reservation Service: `http://localhost:8081`

These URLs can be configured in `.env` file:
```
REACT_APP_CARS_API_URL=http://localhost:8080
REACT_APP_RESERVATIONS_API_URL=http://localhost:8081
```

### Adding New Car Types
1. Add car images to `public/images/cars/{type}/`
2. Update car types in `src/types/cars.ts`
3. Add corresponding entries in the mock data or API integration

### Testing
Tests are located next to the components they test:
```
src/
└── components/
    └── CarCard/
        ├── CarCard.tsx
        └── CarCard.test.tsx
```

Run tests with:
```bash
npm run test
```
