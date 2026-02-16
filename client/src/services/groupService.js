// services/groupService.js
import api from '../api/axios';

class GroupService {
  // Get all groups
  async getGroups() {
    const response = await api.get('/groups');
    return response.data.data;
  }

  // Get single group
  async getGroup(id) {
    const response = await api.get(`/groups/${id}`);
    return response.data.data;
  }

  // Create group
  async createGroup(data) {
    const response = await api.post('/groups', data);
    return response.data.data;
  }

  // Update group
  async updateGroup(id, data) {
    const response = await api.put(`/groups/${id}`, data);
    return response.data.data;
  }

  // Update group status
  async updateGroupStatus(id, status) {
    const response = await api.patch(`/groups/${id}/status`, { status });
    return response.data;
  }

  // Get teams in group
  async getGroupTeams(groupId) {
    const response = await api.get(`/groups/${groupId}/teams`);
    return response.data.data;
  }
}

// services/teamService.js
class TeamService {
  // Get all teams
  async getTeams(params = {}) {
    const response = await api.get('/teams', { params });
    return response.data.data;
  }

  // Get single team
  async getTeam(id) {
    const response = await api.get(`/teams/${id}`);
    return response.data.data;
  }

  // Create team
  async createTeam(data) {
    const response = await api.post('/teams', data);
    return response.data.data;
  }

  // Update team
  async updateTeam(id, data) {
    const response = await api.put(`/teams/${id}`, data);
    return response.data.data;
  }

  // Update team status
  async updateTeamStatus(id, status) {
    const response = await api.patch(`/teams/${id}/status`, { status });
    return response.data;
  }

  // Get users in team
  async getTeamUsers(teamId) {
    const response = await api.get(`/teams/${teamId}/users`);
    return response.data.data;
  }
}

export { GroupService, TeamService };
export default new GroupService();