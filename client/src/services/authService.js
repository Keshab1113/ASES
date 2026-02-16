// services/authService.js
import api from '../api/axios';

class AuthService {
  // Login
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  // Register
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  // Logout
  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Forgot password
  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  // Reset password
  async resetPassword(token, password) {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  }

  // Verify email
  async verifyEmail(token) {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  }

  // Get current user from token
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        group_id: payload.group_id,
        team_id: payload.team_id,
        is_approved: payload.is_approved,
        group_name: payload.group_name,
        team_name: payload.team_name,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      return null;
    }
  }
}

export default new AuthService();