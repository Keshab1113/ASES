// services/complianceService.js
import api from '../api/axios';

class ComplianceService {
  async getComplianceItems(params = {}) {
    const response = await api.get('/compliance', { params });
    return response.data.data;
  }

  async getComplianceItem(id) {
    const response = await api.get(`/compliance/${id}`);
    return response.data.data;
  }

  async createComplianceItem(data) {
    const response = await api.post('/compliance', data);
    return response.data.data;
  }

  async updateComplianceItem(id, data) {
    const response = await api.put(`/compliance/${id}`, data);
    return response.data.data;
  }

  async updateComplianceStatus(id, status) {
    const response = await api.put(`/compliance/${id}/status`, { status });
    return response.data;
  }

  async uploadEvidence(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('compliance_id', id);

    const response = await api.post('/compliance/upload-evidence', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async getComplianceStats(groupId) {
    const response = await api.get('/compliance/stats', { params: { groupId } });
    return response.data.data;
  }
}

export default new ComplianceService();