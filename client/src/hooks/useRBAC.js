// hooks/useRBAC.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import rbacService from '../services/rbacService';
import { toast } from '@/hooks/use-toast';

// Query Keys
export const rbacKeys = {
  all: ['rbac'],
  roles: () => [...rbacKeys.all, 'roles'],
  role: (id) => [...rbacKeys.roles(), id],
  permissions: () => [...rbacKeys.all, 'permissions'],
  userPermissions: (userId) => [...rbacKeys.all, 'user-permissions', userId],
  auditLogs: () => [...rbacKeys.all, 'audit-logs'],
};

// Roles
export const useRoles = () => {
  return useQuery({
    queryKey: rbacKeys.roles(),
    queryFn: rbacService.getRoles,
  });
};

export const useRole = (id) => {
  return useQuery({
    queryKey: rbacKeys.role(id),
    queryFn: () => rbacService.getRole(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rbacService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rbacKeys.roles() });

      toast({
        title: 'Success', variant: "success",
        description: 'Role created successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to create role',
      });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => rbacService.updateRole(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: rbacKeys.role(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: rbacKeys.roles() });

      toast({
        title: 'Success', variant: "success",
        description: 'Role updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to update role',
      });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rbacService.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rbacKeys.roles() });

      toast({
        title: 'Success', variant: "success",
        description: 'Role deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to delete role',
      });
    },
  });
};

// Permissions
export const usePermissions = () => {
  return useQuery({
    queryKey: rbacKeys.permissions(),
    queryFn: rbacService.getPermissions,
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rbacService.createPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rbacKeys.permissions() });

      toast({
        title: 'Success', variant: "success",
        description: 'Permission created successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to create permission',
      });
    },
  });
};

export const useCheckPermission = (userId, permissionKey) => {
  return useQuery({
    queryKey: [...rbacKeys.all, 'check', userId, permissionKey],
    queryFn: () => rbacService.checkPermission(userId, permissionKey),
    enabled: !!userId && !!permissionKey,
  });
};

// User Permissions
export const useUserPermissions = (userId) => {
  return useQuery({
    queryKey: rbacKeys.userPermissions(userId),
    queryFn: () => rbacService.getUserPermissions(userId),
    enabled: !!userId,
  });
};

export const useGrantPermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rbacService.grantPermission,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: rbacKeys.userPermissions(variables.userId),
      });

      toast({
        title: 'Success', variant: "success",
        description: 'Permission granted successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to grant permission',
      });
    },
  });
};

export const useRevokePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rbacService.revokePermission,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: rbacKeys.userPermissions(variables.userId),
      });

      toast({
        title: 'Success', variant: "success",
        description: 'Permission revoked successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to revoke permission',
      });
    },
  });
};

// Audit Logs
export const useAuditLogs = (limit = 100) => {
  return useQuery({
    queryKey: [...rbacKeys.auditLogs(), limit],
    queryFn: () => rbacService.getAuditLogs(limit),
    refetchInterval: 60000,
  });
};
