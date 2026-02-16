// services/analyticsService.js
import api from '../api/axios';

class AnalyticsService {
  async getTrends(params = {}) {
    const response = await api.get('/analytics/trends', { params });
    return response.data.data;
  }

  async getDashboardMetrics(params = {}) {
    const response = await api.get('/analytics/dashboard', { params });
    return response.data.data;
  }

  async getDepartmentMetrics(params = {}) {
    const response = await api.get('/analytics/departments', { params });
    return response.data.data;
  }

  async getPredictiveAnalysis(params = {}) {
    const response = await api.get('/analytics/predictive', { params });
    return response.data.data;
  }

  async generateReport(data) {
    const response = await api.post('/analytics/reports/generate', data, {
      responseType: 'blob'
    });
    return response.data;
  }

  async emailReport(data) {
    const response = await api.post('/analytics/reports/email', data);
    return response.data;
  }

  async getReportHistory() {
    const response = await api.get('/analytics/reports/history');
    return response.data.data;
  }
}

export default new AnalyticsService();