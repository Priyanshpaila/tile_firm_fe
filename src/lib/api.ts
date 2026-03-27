import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Global Axios instance configured for TileVista backend
 */
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Crucial for httpOnly cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // We can add auth headers here if we weren't using httpOnly cookies
    // But since we are using cookies, this is largely transparent
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config;
    
    // Auth token refresh logic could go here if dealing with 401s
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token
        await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        // Re-run original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, force logout mechanism ideally triggered here
        // e.g., using a global event or store method
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
