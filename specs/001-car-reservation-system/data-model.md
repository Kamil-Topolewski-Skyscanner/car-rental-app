# Data Model: Car Rental Frontend

## Types

### Car
```typescript
interface Car {
  id: string;
  type: CarType;
  model: string;
  description: string;
  imageUrl: string;
  dailyRate: number;
  available: boolean;
}

enum CarType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  VAN = 'VAN'
}
```

### Reservation
```typescript
interface Reservation {
  id: string;
  carId: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  status: ReservationStatus;
  totalPrice: number;
}

enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}
```

### Availability
```typescript
interface Availability {
  carType: CarType;
  date: string;     // ISO date string
  availableCount: number;
}
```

### ReservationRequest
```typescript
interface ReservationRequest {
  carType: CarType;
  startDate: string;  // ISO date string
  endDate: string;    // ISO date string;
}
```

## State Management

### Cars Context
```typescript
interface CarsState {
  cars: Car[];
  availability: Availability[];
  loading: boolean;
  error: string | null;
}

interface CarsContextValue {
  state: CarsState;
  searchAvailability: (startDate: string, endDate: string) => Promise<void>;
  filterByType: (type: CarType) => void;
}
```

### Reservation Context
```typescript
interface ReservationState {
  currentReservation: Reservation | null;
  loading: boolean;
  error: string | null;
}

interface ReservationContextValue {
  state: ReservationState;
  createReservation: (request: ReservationRequest) => Promise<void>;
  cancelReservation: (id: string) => Promise<void>;
}
```

## API Endpoints

### Cars Service
- GET `/api/cars` - List all cars
- GET `/api/cars/availability` - Check availability
- GET `/api/cars/{id}` - Get car details

### Reservation Service
- POST `/api/reservations` - Create reservation
- GET `/api/reservations/{id}` - Get reservation details
- PUT `/api/reservations/{id}/cancel` - Cancel reservation
