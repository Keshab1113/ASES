// hooks/useUsers.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../services/userService";
import { toast } from "@/hooks/use-toast";

// Query Keys
export const userKeys = {
  all: ["users"],
  lists: () => [...userKeys.all, "list"],
  list: (filters) => [...userKeys.lists(), { filters }],
  details: () => [...userKeys.all, "detail"],
  detail: (id) => [...userKeys.details(), id],
  pending: () => [...userKeys.all, "pending"],
  activity: (id) => [...userKeys.all, "activity", id],
  metrics: (id) => [...userKeys.all, "metrics", id],
};

// Get all users
export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userService.getUsers(params),
  });
};

// Get single user
export const useUser = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
};

// Get pending approvals
export const usePendingApprovals = () => {
  return useQuery({
    queryKey: userKeys.pending(),
    queryFn: userService.getPendingApprovals,
    refetchInterval: 30000,
  });
};

// Approve user mutation
export const useApproveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.approveUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.pending() });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });

      toast({
        title: "Success",
        variant: "success",
        description: "User approved successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to approve user",
      });
    },
  });
};

// Reject user mutation
export const useRejectUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }) => userService.rejectUser(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.pending() });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });

      toast({
        title: "Success",
        variant: "success",
        description: "User rejected",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to reject user",
      });
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });

      toast({
        title: "Success",
        variant: "success",
        description: "Profile updated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update profile",
      });
    },
  });
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: userService.changePassword,
    onSuccess: () => {
      toast({
        title: "Success",
        variant: "success",
        description: "Password changed successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to change password",
      });
    },
  });
};

// Get user activity
export const useUserActivity = (id) => {
  return useQuery({
    queryKey: userKeys.activity(id),
    queryFn: () => userService.getUserActivity(id),
    enabled: !!id,
  });
};

// Get user metrics
export const useUserMetrics = (id) => {
  return useQuery({
    queryKey: userKeys.metrics(id),
    queryFn: () => userService.getUserMetrics(id),
    enabled: !!id,
  });
};

// Update notifications mutation
export const useUpdateNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, preferences }) =>
      userService.updateNotifications(id, preferences),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });

      toast({
        title: "Success",
        variant: "success",
        description: "Notification preferences updated",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update notifications",
      });
    },
  });
};

// Upload profile image mutation
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }) => userService.uploadProfileImage(id, file),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });

      toast({
        title: "Success",
        variant: "success",
        description: "Profile image uploaded successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to upload image",
      });
    },
  });
};

// Update user status mutation
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => userService.updateUserStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["teams", "users"] });

      toast({
        title: "Success",
        variant: "success",
        description: `User ${
          variables.status === "active" ? "activated" : "deactivated"
        } successfully`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update user status",
      });
    },
  });
};
