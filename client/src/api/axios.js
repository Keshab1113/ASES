
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear token and redirect to login
      localStorage.removeItem("token");
      
      // Redirect to login page if we're not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      
      return Promise.reject(error);
    }
    
    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      // Check if it's a pending approval error
      if (error.response.data?.status === 'pending') {
        // User is pending approval - show message
        console.log("Account pending approval");
      }
      // Other 403 errors will be handled by the component
    }
    
    return Promise.reject(error);
  }
);

export default api;
