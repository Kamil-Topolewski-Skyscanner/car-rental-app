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
  ECONOMY = 'ECONOMY',
  COMPACT = 'COMPACT',
  MIDSIZE = 'MIDSIZE',
  LUXURY = 'LUXURY',
  SUV = 'SUV',
  VAN = 'VAN',
}

/**
 * Reservation request payload
 */
export interface ReservationRequest {
  carId: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
}

/**
 * Reservation response from the reservations service
 */
export interface Reservation {
  id: string;
  carId: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Reservation status enum
 */
export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}
