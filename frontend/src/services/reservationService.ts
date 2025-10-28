import { Reservation, ReservationRequest } from './types';
import { reservationsApi } from './api';

/**
 * Service for interacting with the reservations API
 */
export class ReservationService {
  /**
   * Create a new reservation
   */
  static async createReservation(request: ReservationRequest): Promise<Reservation> {
    return reservationsApi.post<Reservation>('/reservations', request);
  }

  /**
   * Get all reservations for a customer email
   */
  static async getReservationsByEmail(email: string): Promise<Reservation[]> {
    return reservationsApi.get<Reservation[]>(`/reservations?email=${email}`);
  }

  /**
   * Get a specific reservation by ID
   */
  static async getReservationById(id: string): Promise<Reservation> {
    return reservationsApi.get<Reservation>(`/reservations/${id}`);
  }

  /**
   * Cancel a reservation
   */
  static async cancelReservation(id: string): Promise<Reservation> {
    return reservationsApi.delete<Reservation>(`/reservations/${id}`);
  }
}
