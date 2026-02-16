// hooks/useIndicators.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import indicatorService from '../services/indicatorService';
import { toast } from '@/hooks/use-toast';

// Query Keys
export const indicatorKeys = {
  all: ['indicators'],

  lists: () => [...indicatorKeys.all, 'list'],
  list: (filters) => [...indicatorKeys.lists(), { filters }],

  details: () => [...indicatorKeys.all, 'detail'],
  detail: (id, type) => [...indicatorKeys.details(), id, type],

  assignments: () => [...indicatorKeys.all, 'assignments'],
  myAssignments: () => [...indicatorKeys.assignments(), 'me'],

  results: (id, type) => [...indicatorKeys.all, 'results', id, type],
};

// Get all indicators
export const useIndicators = () => {
  return useQuery({
    queryKey: indicatorKeys.lists(),
    queryFn: indicatorService.getIndicators,
    select: (data) => ({
      leading: data.leading || [],
      lagging: data.lagging || [],
    }),
  });
};

// Get single indicator
export const useIndicator = (id, type) => {
  return useQuery({
    queryKey: indicatorKeys.detail(id, type),
    queryFn: () => indicatorService.getIndicator({ id, type }),
    enabled: !!id && !!type,
  });
};

// Get indicator details
export const useIndicatorDetails = (id, type) => {
  return useQuery({
    queryKey: [...indicatorKeys.detail(id, type), 'details'],
    queryFn: () => indicatorService.getIndicatorDetails({ id, type }),
    enabled: !!id && !!type,
  });
};

// Get indicator results
export const useIndicatorResults = (id, type) => {
  return useQuery({
    queryKey: indicatorKeys.results(id, type),
    queryFn: () => indicatorService.getIndicatorResults({ id, type }),
    enabled: !!id && !!type,
  });
};

// Create indicator mutation
export const useCreateIndicator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: indicatorService.createIndicator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: indicatorKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Indicator created successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to create indicator',
      });
    },
  });
};

// Delete indicator mutation
export const useDeleteIndicator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: indicatorService.deleteIndicator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: indicatorKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Indicator deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to delete indicator',
      });
    },
  });
};

// Get my assignments
export const useMyAssignments = () => {
  return useQuery({
    queryKey: indicatorKeys.myAssignments(),
    queryFn: indicatorService.getMyAssignments,
    select: (data) => ({
      leading: data.leading || [],
      lagging: data.lagging || [],
    }),
  });
};

// Update assignment status mutation
export const useUpdateAssignmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: indicatorService.updateAssignmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: indicatorKeys.myAssignments(),
      });

      toast({
        title: 'Success', variant: "success",
        description: 'Status updated successfully!',
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

// Assign indicator mutation
export const useAssignIndicator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: indicatorService.assignIndicator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: indicatorKeys.lists() });

      toast({
        title: 'Success', variant: "success",
        description: 'Indicator assigned successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to assign indicator',
      });
    },
  });
};

// Get available users
export const useAvailableUsers = (user) => {
  return useQuery({
    queryKey: ['users', 'available', user?.role, user?.group_id, user?.team_id],
    queryFn: () =>
      indicatorService.getAvailableUsers({
        role: user?.role,
        groupId: user?.group_id,
        teamId: user?.team_id,
      }),
    enabled: !!user,
  });
};

// Upload document mutation
export const useUploadDocument = () => {
  return useMutation({
    mutationFn: indicatorService.uploadDocument,
    onSuccess: (data) => {
      if (data.analysis?.indicators?.length > 0) {
        toast({
          title: 'Upload Complete',
          description: `Document uploaded! ${data.analysis.indicators.length} indicators found.`,
        });
      } else {
        toast({
          title: 'Upload Complete',
          description: 'Document uploaded successfully!',
        });
      }
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error.response?.data?.message || 'Upload failed',
      });
    },
  });
};

// Share result mutation
export const useShareResult = () => {
  return useMutation({
    mutationFn: indicatorService.shareResult,
    onSuccess: (data) => {
      navigator.clipboard.writeText(data.share_url);

      toast({
        title: 'Copied',
        description: 'Share link copied to clipboard!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to share result',
      });
    },
  });
};

// Get shared result
export const useSharedResult = (shareToken) => {
  return useQuery({
    queryKey: ['shared', 'result', shareToken],
    queryFn: () => indicatorService.getSharedResult(shareToken),
    enabled: !!shareToken,
    retry: false,
    staleTime: Infinity,
  });
};
