// hooks/useCompliance.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import complianceService from '../services/complianceService';
import { toast } from '@/hooks/use-toast';

// Query Keys
export const complianceKeys = {
  all: ['compliance'],
  lists: () => [...complianceKeys.all, 'list'],
  list: (filters) => [...complianceKeys.lists(), { filters }],
  details: () => [...complianceKeys.all, 'detail'],
  detail: (id) => [...complianceKeys.details(), id],
  stats: (groupId) => [...complianceKeys.all, 'stats', groupId],
};

export const useComplianceItems = (params = {}) => {
  return useQuery({
    queryKey: complianceKeys.list(params),
    queryFn: () => complianceService.getComplianceItems(params),
  });
};

export const useComplianceItem = (id) => {
  return useQuery({
    queryKey: complianceKeys.detail(id),
    queryFn: () => complianceService.getComplianceItem(id),
    enabled: !!id,
  });
};

export const useCreateComplianceItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: complianceService.createComplianceItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Compliance item added successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to add compliance item',
      });
    },
  });
};

export const useUpdateComplianceItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      complianceService.updateComplianceItem(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: complianceKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Compliance item updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message ||
          'Failed to update compliance item',
      });
    },
  });
};

export const useUpdateComplianceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      complianceService.updateComplianceStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: complianceKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() });

      toast({
        title: 'Status Updated',
        description: `Status updated to ${variables.status}`,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update status',
      });
    },
  });
};

export const useUploadEvidence = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }) =>
      complianceService.uploadEvidence(id, file),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: complianceKeys.detail(variables.id),
      });

      toast({
        title: 'Success', variant: "success",
        description: 'Evidence uploaded successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to upload evidence',
      });
    },
  });
};

export const useComplianceStats = (groupId) => {
  return useQuery({
    queryKey: complianceKeys.stats(groupId),
    queryFn: () => complianceService.getComplianceStats(groupId),
    enabled: !!groupId,
  });
};
