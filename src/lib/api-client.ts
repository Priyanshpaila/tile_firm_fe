import { api } from './api';

/**
 * Standard API Response Structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Auth Types
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'staff' | 'admin';
  avatar?: string;
}

/**
 * Product Types
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  specifications: Record<string, any>;
  isFeatured: boolean;
}

/**
 * Appointment Types
 */
export interface Appointment {
  id: string;
  user: string;
  date: string;
  time: string;
  address: string;
  serviceType: string;
  notes?: string;
  status: 'pending' | 'scheduled' | 'assigned' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  amount: number;
}

/**
 * API Client Object
 */
export const apiClient = {
  // Auth
  auth: {
    login: (data: any): Promise<ApiResponse<{ user: User }>> => api.post('/auth/login', data),
    register: (data: any): Promise<ApiResponse<{ user: User }>> => api.post('/auth/register', data),
    logout: (): Promise<ApiResponse<null>> => api.post('/auth/logout'),
    me: (): Promise<ApiResponse<{ user: User }>> => api.get('/auth/me'),
    refresh: (): Promise<ApiResponse<null>> => api.post('/auth/refresh'),
  },

  // Products
  products: {
    getAll: (params?: any): Promise<ApiResponse<{ products: Product[] }>> => api.get('/products', { params }),
    getOne: (idOrSlugOrSku: string): Promise<ApiResponse<{ product: Product }>> => api.get(`/products/${idOrSlugOrSku}`),
  },

  // Categories
  categories: {
    getAll: (): Promise<ApiResponse<{ categories: any[] }>> => api.get('/categories'),
  },

  // Users
  users: {
    getProfile: (): Promise<ApiResponse<{ user: User }>> => api.get('/auth/me'),
    updateProfile: (data: any): Promise<ApiResponse<{ user: User }>> => api.put('/users/profile', data),
    getWishlist: (): Promise<ApiResponse<{ wishlist: any[] }>> => api.get('/users/wishlist'),
    toggleWishlist: (productId: string): Promise<ApiResponse<{ message: string }>> => api.post(`/users/wishlist/${productId}`),
  },

  // Appointments
  appointments: {
    create: (data: any): Promise<ApiResponse<{ appointment: Appointment }>> => api.post('/appointments', data),
    getMy: (): Promise<ApiResponse<{ appointments: Appointment[] }>> => api.get('/appointments/my-appointments'),
  },

  // Payments
  payments: {
    createOrder: (appointmentId: string): Promise<ApiResponse<any>> => api.post('/payments/create-order', { appointmentId }),
    verify: (data: any): Promise<ApiResponse<{ appointment: Appointment }>> => api.post('/payments/verify', data),
  },

  // Admin
  admin: {
    getStats: (): Promise<ApiResponse<{ stats: any }>> => api.get('/admin/stats'),
  }
};
