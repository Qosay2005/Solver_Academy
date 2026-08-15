import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';
import useAuthStore from './authStore';

export function normalizeProfileData(data) {
  const profile = data?.response || data?.data || data || {};

  const orders = Array.isArray(profile?.orders)
    ? profile.orders
    : Array.isArray(data?.response?.orders)
      ? data.response.orders
      : Array.isArray(data?.data?.orders)
        ? data.data.orders
        : [];

  return {
    fullName: profile?.fullName || profile?.name || profile?.userName || '',
    email: profile?.email || '',
    phone: profile?.phone || profile?.phoneNumber || '',
    orders,
  };
}

export default function useProfile() {
  const token = useAuthStore((state) => state.token);

  const getProfile = async () => {
    const response = await AuthaxiosInstance.get('/Profile');
    return response.data;
  };

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(token),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const updateProfile = async (payload) => {
    const response = await AuthaxiosInstance.patch('/Profile', payload);
    return response.data;
  };

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
