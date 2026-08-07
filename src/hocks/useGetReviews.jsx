import { useQuery } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useGetReviews(productId) {
  const getReviews = async () => {
    const response = await AuthaxiosInstance.get(`/Products/${productId}/reviews`);
    return response.data;
  };

  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: getReviews,
    enabled: Boolean(productId),
    staleTime: 1000 * 60 * 2,
  });
}
