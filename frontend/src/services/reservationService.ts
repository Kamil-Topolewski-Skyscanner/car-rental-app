import { Reservation, ReservationRequest, CarType } from './types';
import { reservationsApi } from './api';

/**
 * Format a date to match the backend's expected format: "2025-12-17T12:00:00"
 */
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 19);
}

/**
 * Service for interacting with the reservations API
 */
export class ReservationService {
  /**
   * Create a new reservation with calculated duration and price
   * @param params Parameters needed to create a reservation
   */
  static async createReservation(params: {
    customerId: string;
    startDate: Date;
    endDate: Date;
    carType: CarType;
  }): Promise<Reservation> {
    const { customerId, startDate, carType } = params;

    // Calculate duration in days
    const durationMs = params.endDate.getTime() - startDate.getTime();
    const duration = Math.ceil(durationMs / (1000 * 60 * 60 * 24));

    const request: ReservationRequest = {
      customerId,
      reservationStartDate: formatDate(startDate),
      duration,
      carType
    };

    return reservationsApi.post<Reservation>('/reservations', request);
  }

  /**
   * Get all reservations for a customer
   */
  static async getReservationsByCustomerId(customerId: string): Promise<Reservation[]> {
    return reservationsApi.get<Reservation[]>(`/reservations?customerId=${customerId}`);
  }

  /**
   * Get a specific reservation by ID
   */
  static async getReservationById(id: number): Promise<Reservation> {
    return reservationsApi.get<Reservation>(`/reservations/${id}`);
  }

  /**
   * Cancel a reservation
   */
  static async cancelReservation(id: number): Promise<Reservation> {
    return reservationsApi.delete<Reservation>(`/reservations/${id}`);
  }
}
