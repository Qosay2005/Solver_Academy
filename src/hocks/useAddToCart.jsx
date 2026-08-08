import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useAddToCart() {
  const queryClient = useQueryClient();

  const addToCart = async (data) => {
    if (!data?.ProductId) {
      throw new Error('Product id is missing.');
    }

    const response = await AuthaxiosInstance.post('/Carts', data);
    return response.data;
  };

  return useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log('add to cart success', data);
      // بنجبر إعادة الجلب فورًا مش بس نعلّمها stale
      queryClient.invalidateQueries({ queryKey: ['cart'], refetchType: 'active' });
      queryClient.refetchQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('add to cart failed', error?.response?.data || error?.message);
    },
  });
}