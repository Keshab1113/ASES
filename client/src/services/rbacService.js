// services/rbacService.js
import api from '../api/axios';

class RBACService {
  // Roles
  async getRoles() {
    const response = await api.get('/rbac/roles');
    return response.data.data;
  }

  async getRole(id) {
    const response = await api.get(`/rbac/roles/${id}`);
    return response.data.data;
  }

  async createRole(data) {
    const response = await api.post('/rbac/roles', data);
    return response.data.data;
  }

  async updateRole(id, data) {
    const response = await api.put(`/rbac/roles/${id}`, data);
    return response.data.data;
  }

  async deleteRole(id) {
    const response = await api.delete(`/rbac/roles/${id}`);
    return response.data;
  }

  // Permissions
  async getPermissions() {
    const response = await api.get('/rbac/permissions');
    return response.data.data;
  }

  async createPermission(data) {
    const response = await api.post('/rbac/permissions/create', data);
    return response.data.data;
  }

  async checkPermission(userId, permissionKey) {
    const response = await api.get(`/rbac/permissions/check?userId=${userId}&permissionKey=${permissionKey}`);
    return response.data.has_permission;
  }

  // User Permissions
  async getUserPermissions(userId) {
    const response = await api.get(`/rbac/permissions/user/${userId}`);
    return response.data.data;
  }

  async grantPermission(data) {
    const response = await api.post('/rbac/permissions/grant', data);
    return response.data;
  }

  async revokePermission(data) {
    const response = await api.post('/rbac/permissions/revoke', data);
    return response.data;
  }

  // Audit Logs
  async getAuditLogs(limit = 100) {
    const response = await api.get(`/rbac/audit-logs?limit=${limit}`);
    return response.data.data;
  }
}

export default new RBACService();