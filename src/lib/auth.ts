export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'staff';
  avatar?: string;
  wishlist?: string[];
}

export interface AuthResponse {
  success: boolean;
  user: User;
  message?: string;
}
