/**
 * Storage key constants
 */
const StorageKeys = {
  CARS: 'car-rental:cars',
  RESERVATIONS: 'car-rental:reservations',
  SESSION: 'car-rental:session',
} as const;

/**
 * Type-safe wrapper for localStorage
 */
class LocalStorage {
  /**
   * Store data in localStorage
   */
  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing data for key ${key}:`, error);
    }
  }

  /**
   * Retrieve data from localStorage
   */
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove data from localStorage
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
    }
  }
}

/**
 * Session utilities for maintaining user state
 */
export class SessionManager {
  /**
   * Store user session data
   */
  static saveSession(email: string): void {
    LocalStorage.set(StorageKeys.SESSION, { email, timestamp: Date.now() });
  }

  /**
   * Get current session data
   */
  static getSession(): { email: string; timestamp: number } | null {
    return LocalStorage.get(StorageKeys.SESSION);
  }

  /**
   * Clear session data
   */
  static clearSession(): void {
    LocalStorage.remove(StorageKeys.SESSION);
  }

  /**
   * Check if session is valid (less than 24 hours old)
   */
  static isSessionValid(): boolean {
    const session = this.getSession();
    if (!session) return false;

    const MAX_SESSION_AGE = 24 * 60 * 60 * 1000; // 24 hours
    return Date.now() - session.timestamp < MAX_SESSION_AGE;
  }
}

/**
 * Cache utilities for storing and retrieving data
 */
export class CacheManager {
  /**
   * Cache car data
   */
  static cacheCars(cars: any[]): void {
    LocalStorage.set(StorageKeys.CARS, {
      data: cars,
      timestamp: Date.now(),
    });
  }

  /**
   * Get cached car data if it's still fresh (less than 1 hour old)
   */
  static getCachedCars(): any[] | null {
    const cached = LocalStorage.get<{ data: any[]; timestamp: number }>(StorageKeys.CARS);
    if (!cached) return null;

    const MAX_CACHE_AGE = 60 * 60 * 1000; // 1 hour
    if (Date.now() - cached.timestamp > MAX_CACHE_AGE) {
      this.clearCarCache();
      return null;
    }

    return cached.data;
  }

  /**
   * Clear car cache
   */
  static clearCarCache(): void {
    LocalStorage.remove(StorageKeys.CARS);
  }

  /**
   * Cache reservation data
   */
  static cacheReservations(reservations: any[]): void {
    LocalStorage.set(StorageKeys.RESERVATIONS, {
      data: reservations,
      timestamp: Date.now(),
    });
  }

  /**
   * Get cached reservation data if it's still fresh (less than 5 minutes old)
   */
  static getCachedReservations(): any[] | null {
    const cached = LocalStorage.get<{ data: any[]; timestamp: number }>(StorageKeys.RESERVATIONS);
    if (!cached) return null;

    const MAX_CACHE_AGE = 5 * 60 * 1000; // 5 minutes
    if (Date.now() - cached.timestamp > MAX_CACHE_AGE) {
      this.clearReservationCache();
      return null;
    }

    return cached.data;
  }

  /**
   * Clear reservation cache
   */
  static clearReservationCache(): void {
    LocalStorage.remove(StorageKeys.RESERVATIONS);
  }

  /**
   * Clear all cached data
   */
  static clearAllCache(): void {
    this.clearCarCache();
    this.clearReservationCache();
  }
}
