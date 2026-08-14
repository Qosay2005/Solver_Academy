import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useUpdateCart() {
  const queryClient = useQueryClient();

  const updateCart = async ({ productId, count }) => {
    if (!productId) {
      throw new Error('Product id is missing.');
    }

    const response = await AuthaxiosInstance.put(`/Carts/${productId}`, { Count: count });
    return response.data;
  };

  return useMutation({
    mutationFn: updateCart,
    onSuccess: (data) => {
      console.log('update cart success', data);
      queryClient.invalidateQueries({ queryKey: ['cart'], refetchType: 'active' });
      queryClient.refetchQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('update cart failed', error?.response?.data || error?.message);
    },
  });
}