/**
 * Car type definition from the cars service
 */
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: CarType;
  pricePerDay: number;
  isAvailable: boolean;
  imageUrl?: string;
}

/**
 * Car type enum from the cars service
 */
export enum CarType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  VAN = 'VAN'
}

/**
 * Reservation request payload
 */
export interface ReservationRequest {
  customerId: string;
  reservationStartDate: string; // Format: "2025-12-17T12:00:00"
  duration: number;
  carType: CarType;
}

/**
 * Reservation response from the reservations service
 */
export interface Reservation {
  id: number;
  customerId: string;
  carId: string;
  reservationStartDate: string; // Format: "2025-12-17T12:00:00"
  reservationEndDate: string;   // Format: "2025-12-17T12:00:00"
  duration: number;
  price: number;
  createdAt: string;           // ISO string of LocalDateTime
  updatedAt: string;           // ISO string of LocalDateTime
}
