import { Car, CarType } from './types';
import { carsApi } from './api';

interface BackendCar {
  carId: string;
  carType: CarType;
  pricePerDay: number;
}

/**
 * Transform backend car format to frontend car format
 */
const transformCar = (backendCar: BackendCar): Car => {
  // Map backend car type to a more user-friendly make/model
  const carDetails = {
    SEDAN: { make: 'Honda', model: 'Civic' },
    SUV: { make: 'Toyota', model: 'RAV4' },
    VAN: { make: 'Ford', model: 'Transit' }
  };

  const details = carDetails[backendCar.carType] || { make: 'Unknown', model: 'Unknown' };

  return {
    id: backendCar.carId,
    type: backendCar.carType,
    pricePerDay: backendCar.pricePerDay,
    isAvailable: true, // We can update this when availability endpoint is ready
    year: new Date().getFullYear(), // Default to current year
    ...details
  };
};

/**
 * Service for interacting with the cars API
 */
export class CarService {
  /**
   * Get all available cars
   */
  static async getAllCars(): Promise<Car[]> {
    console.log('Hello from carService method');
    const backendCars = await carsApi.get<BackendCar[]>('/cars');
    return backendCars.map(transformCar);
  }

  /**
   * Get cars filtered by type
   */
  static async getCarsByType(type: CarType): Promise<Car[]> {
    const backendCars = await carsApi.get<BackendCar[]>(`/cars/${type}`);
    return backendCars.map(transformCar);
  }

  /**
   * Get a specific car by ID
   */
  static async getCarById(id: string): Promise<Car> {
    const backendCar = await carsApi.get<BackendCar>(`/cars/${id}`);
    return transformCar(backendCar);
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
