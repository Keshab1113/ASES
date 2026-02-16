// services/userService.js
import api from "../api/axios";

class UserService {
  // Get all users
  async getUsers(params = {}) {
    const response = await api.get("/users", { params });
    return response.data.data;
  }

  // Get single user
  async getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
  }

  // Get pending approvals
  async getPendingApprovals() {
    const response = await api.get("/users/pending");
    return response.data.data;
  }

  // Approve user
  async approveUser(id) {
    const response = await api.post(`/users/${id}/approve`);
    return response.data;
  }

  // Reject user
  async rejectUser(id, reason) {
    const response = await api.post(`/users/${id}/reject`, { reason });
    return response.data;
  }

  // Update user
  async updateUser(id, data) {
    const response = await api.put(`/users/${id}`, data);
    return response.data.data;
  }

  // Change password
  async changePassword(data) {
    const response = await api.post("/users/change-password", data);
    return response.data;
  }

  // Get user activity
  async getUserActivity(id) {
    const response = await api.get(`/users/${id}/activity`);
    return response.data.data;
  }

  // Get user metrics
  async getUserMetrics(id) {
    const response = await api.get(`/users/${id}/metrics`);
    return response.data.data;
  }

  // Update notification preferences
  async updateNotifications(id, preferences) {
    const response = await api.put(`/users/${id}/notifications`, preferences);
    return response.data.data;
  }

  // Upload profile image
  async uploadProfileImage(id, file) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post(`/users/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  }

  async updateUserStatus(id, status) {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  }
}

export default new UserService();
