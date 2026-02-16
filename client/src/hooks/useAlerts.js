// hooks/useAlerts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import alertsService from "../services/alertsService";
import { toast } from "@/hooks/use-toast";

// Query Keys
export const alertKeys = {
  all: ["alerts"],
  lists: () => [...alertKeys.all, "list"],
  list: (filters) => [...alertKeys.lists(), { filters }],
  stats: () => [...alertKeys.all, "stats"],
};

export const useAlerts = (params = {}) => {
  return useQuery({
    queryKey: alertKeys.list(params),
    queryFn: () => alertsService.getAlerts(params),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useAlertStats = () => {
  return useQuery({
    queryKey: alertKeys.stats(),
    queryFn: alertsService.getAlertStats,
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alertsService.acknowledgeAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.lists() });
      queryClient.invalidateQueries({ queryKey: alertKeys.stats() });
      toast({
        title: "Success",
        description: "Alert acknowledged",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to acknowledge alert",
      });
    },
  });
};

export const useResolveAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alertsService.resolveAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.lists() });
      queryClient.invalidateQueries({ queryKey: alertKeys.stats() });
      toast({
        title: "Success",
        description: "Alert resolved",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to resolve alert",
      });
    },
  });
};

export const useConfigureAlertSettings = () => {
  return useMutation({
    mutationFn: alertsService.configureAlertSettings,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Alert settings updated",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update settings",
      });
    },
  });
};
