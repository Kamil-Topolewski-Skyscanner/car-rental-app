/**
 * Base configuration for API calls
 */
const config = {
  carsApi: '/api',
  reservationsApi: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Generic error type for API responses
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Base API client with error handling
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
        status: response.status,
      }));
      throw error;
    }
    return response.json();
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: config.headers,
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, data: unknown): Promise<T> {
    console.log("data");
    console.log(data);
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: config.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: config.headers,
    });
    return this.handleResponse<T>(response);
  }
}

export const carsApi = new ApiClient(config.carsApi);
export const reservationsApi = new ApiClient(config.reservationsApi);
