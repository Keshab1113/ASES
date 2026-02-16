// hooks/useTeams.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TeamService } from '../services/groupService';
import { toast } from '@/hooks/use-toast';

const teamService = new TeamService();

// Query Keys
export const teamKeys = {
  all: ['teams'],
  lists: () => [...teamKeys.all, 'list'],
  list: (filters) => [...teamKeys.lists(), { filters }],
  details: () => [...teamKeys.all, 'detail'],
  detail: (id) => [...teamKeys.details(), id],
  users: (id) => [...teamKeys.detail(id), 'users'],
};

// Get all teams
export const useTeams = (params = {}) => {
  return useQuery({
    queryKey: teamKeys.list(params),
    queryFn: () => teamService.getTeams(params),
  });
};

// Get single team
export const useTeam = (id) => {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: () => teamService.getTeam(id),
    enabled: !!id,
  });
};

// Create team mutation
export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamService.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['groups', 'teams'] });

      toast({
        title: 'Success', variant: "success",
        description: 'Team created successfully',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to create team',
      });
    },
  });
};

// Update team mutation
export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => teamService.updateTeam(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: teamKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Team updated successfully',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update team',
      });
    },
  });
};

// Update team status mutation
export const useUpdateTeamStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      teamService.updateTeamStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: teamKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: `Team ${
          variables.status === 'active' ? 'activated' : 'deactivated'
        } successfully`,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message ||
          'Failed to update team status',
      });
    },
  });
};

// Get team users
export const useTeamUsers = (teamId) => {
  return useQuery({
    queryKey: teamKeys.users(teamId),
    queryFn: () => teamService.getTeamUsers(teamId),
    enabled: !!teamId,
  });
};
