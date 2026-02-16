// hooks/useGroups.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import groupService from '../services/groupService';
import { toast } from '@/hooks/use-toast';

// Query Keys
export const groupKeys = {
  all: ['groups'],
  lists: () => [...groupKeys.all, 'list'],
  list: (filters) => [...groupKeys.lists(), { filters }],
  details: () => [...groupKeys.all, 'detail'],
  detail: (id) => [...groupKeys.details(), id],
  teams: (id) => [...groupKeys.detail(id), 'teams'],
};

// Get all groups
export const useGroups = () => {
  return useQuery({
    queryKey: groupKeys.lists(),
    queryFn: groupService.getGroups,
  });
};

// Get single group
export const useGroup = (id) => {
  return useQuery({
    queryKey: groupKeys.detail(id),
    queryFn: () => groupService.getGroup(id),
    enabled: !!id,
  });
};

// Create group mutation
export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupService.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Group created successfully',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to create group',
      });
    },
  });
};

// Update group mutation
export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => groupService.updateGroup(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: groupKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Group updated successfully',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update group',
      });
    },
  });
};

// Update group status mutation
export const useUpdateGroupStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      groupService.updateGroupStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: groupKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: `Group ${
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
          'Failed to update group status',
      });
    },
  });
};

// Get teams in group
export const useGroupTeams = (groupId) => {
  return useQuery({
    queryKey: groupKeys.teams(groupId),
    queryFn: () => groupService.getGroupTeams(groupId),
    enabled: !!groupId,
  });
};
