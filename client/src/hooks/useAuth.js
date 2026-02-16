// hooks/useAuth.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);

      // Update user in cache
      queryClient.setQueryData(['currentUser'], data.user);

      toast({
        title: 'Success', variant: "success",
        description: 'Login successful!',
      });

      navigate('/app');
    },
    onError: (error) => {
      if (error.response?.status === 403) {
        if (error.response.data?.status === 'pending') {
          toast({
            variant: 'destructive',
            title: 'Account Pending',
            description:
              'Your account is pending approval. Please contact your administrator.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Account Not Approved',
            description: 'Please contact administrator.',
          });
        }
      } else if (error.response?.status === 401) {
        toast({
          variant: 'destructive',
          title: 'Invalid Credentials',
          description: 'Invalid email or password',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: error.response?.data?.message || 'Login failed',
        });
      }
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast({
        title: 'Registration Successful',
        description:
          'Please check your email for verification.',
        duration: 6000,
      });

      navigate('/login');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Registration failed',
      });
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    authService.logout();
    queryClient.clear();

    toast({
      title: 'Logged Out',
      description: 'Logged out successfully',
    });

    navigate('/login');
  };
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast({
        title: 'Email Sent',
        description:
          'Password reset email sent. Please check your inbox.',
        duration: 6000,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Request Failed',
        description:
          error.response?.data?.message || 'Failed to send reset email',
      });
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ token, password }) =>
      authService.resetPassword(token, password),
    onSuccess: () => {
      toast({
        title: 'Password Reset',
        description:
          'Password reset successful! Please login with your new password.',
      });

      navigate('/login');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Reset Failed',
        description:
          error.response?.data?.message || 'Failed to reset password',
      });
    },
  });
};
