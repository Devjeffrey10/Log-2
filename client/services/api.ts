interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'operator' | 'viewer';
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'operator' | 'viewer';
  status?: 'active' | 'inactive';
}

interface UserStats {
  admin: number;
  operator: number;
  viewer: number;
  total: number;
}

const API_BASE_URL = '/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        // Try to get error message from response if possible
        let errorMessage = `HTTP Error: ${response.status}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          }
        } catch {
          // If JSON parsing fails, use the status text
          errorMessage = response.statusText || errorMessage;
        }

        return {
          success: false,
          message: errorMessage,
        };
      }

      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('API response is not JSON, got:', contentType);
        return {
          success: false,
          message: 'Servidor retornou resposta inválida',
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        message: 'Erro de conexão com o servidor',
      };
    }
  }

  // User management
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users');
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }

  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: UpdateUserData): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserStats(): Promise<ApiResponse<UserStats>> {
    return this.request<UserStats>('/users/stats');
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();
export type { User, CreateUserData, UpdateUserData, UserStats, ApiResponse };
