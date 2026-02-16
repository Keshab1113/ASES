// hooks/useAnalytics.js
import { useQuery, useMutation } from '@tanstack/react-query';
import analyticsService from '../services/analyticsService';
import { toast } from '@/hooks/use-toast';

// Query Keys
export const analyticsKeys = {
  all: ['analytics'],
  trends: (params) => [...analyticsKeys.all, 'trends', params],
  dashboard: (params) => [...analyticsKeys.all, 'dashboard', params],
  departments: (params) => [...analyticsKeys.all, 'departments', params],
  predictive: (params) => [...analyticsKeys.all, 'predictive', params],
  reportHistory: () => [...analyticsKeys.all, 'reports'],
};

export const useTrends = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.trends(params),
    queryFn: () => analyticsService.getTrends(params),
  });
};

export const useDashboardMetrics = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.dashboard(params),
    queryFn: () => analyticsService.getDashboardMetrics(params),
  });
};

export const useDepartmentMetrics = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.departments(params),
    queryFn: () => analyticsService.getDepartmentMetrics(params),
  });
};

export const usePredictiveAnalysis = (params = {}) => {
  return useQuery({
    queryKey: analyticsKeys.predictive(params),
    queryFn: () => analyticsService.getPredictiveAnalysis(params),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: analyticsService.generateReport,
    onSuccess: (data) => {
      // Create download link
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `hse_report_${new Date().toISOString().split('T')[0]}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast({
        title: 'Success', variant: "success",
        description: 'Report generated successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to generate report',
      });
    },
  });
};

export const useEmailReport = () => {
  return useMutation({
    mutationFn: analyticsService.emailReport,
    onSuccess: () => {
      toast({
        title: 'Success', variant: "success",
        description: 'Report sent to your email!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to send email',
      });
    },
  });
};

export const useReportHistory = () => {
  return useQuery({
    queryKey: analyticsKeys.reportHistory(),
    queryFn: analyticsService.getReportHistory,
  });
};
