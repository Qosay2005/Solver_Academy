import { useQuery } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useProfile() {
  const getProfile = async () => {
    const response = await AuthaxiosInstance.get('/Profile');
    return response.data;
  };

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
  });
}
