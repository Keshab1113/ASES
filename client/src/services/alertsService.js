// services/alertsService.js
import api from '../api/axios';

class AlertsService {
  async getAlerts(params = {}) {
    const response = await api.get('/indicators/alerts', { params });
    return response.data.data;
  }

  async acknowledgeAlert(id) {
    const response = await api.post(`/indicators/alerts/${id}/acknowledge`);
    return response.data;
  }

  async resolveAlert(id) {
    const response = await api.post(`/indicators/alerts/${id}/resolve`);
    return response.data;
  }

  async getAlertStats() {
    const response = await api.get('/indicators/alerts/stats');
    return response.data.data;
  }

  async configureAlertSettings(settings) {
    const response = await api.post('/indicators/alerts/configure', settings);
    return response.data;
  }
}

export default new AlertsService();