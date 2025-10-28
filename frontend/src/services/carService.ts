import { Car, CarType } from './types';
import { carsApi } from './api';

/**
 * Service for interacting with the cars API
 */
export class CarService {
  /**
   * Get all available cars
   */
  static async getAllCars(): Promise<Car[]> {
    console.log('Hello from carService method');
    return carsApi.get<Car[]>('/cars');
  }

  /**
   * Get cars filtered by type
   */
  static async getCarsByType(type: CarType): Promise<Car[]> {
    return carsApi.get<Car[]>(`/cars/${type}`);
  }

  /**
   * Get a specific car by ID
   */
  static async getCarById(id: string): Promise<Car> {
    return carsApi.get<Car>(`/cars/${id}`);
  }

  /**
   * Check if a car is available for a specific date range
   */
  static async checkCarAvailability(
    carId: string,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    const response = await carsApi.get<{ isAvailable: boolean }>(
      `/cars/${carId}/availability?startDate=${startDate}&endDate=${endDate}`
    );
    return response.isAvailable;
  }
}
