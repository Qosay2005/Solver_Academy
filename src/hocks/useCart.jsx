import { useQuery } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useCart() {
  const getItems = async () => {
    const response = await AuthaxiosInstance.get('/Carts');
    return response.data;
  };

  return useQuery({
    queryKey: ['cart','en'],
    queryFn: getItems,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}