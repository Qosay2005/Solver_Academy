import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useClearCart() {
  const queryClient = useQueryClient();

  const clearCart = async () => {
    try {
      const response = await AuthaxiosInstance.delete('/Carts/clear');
      console.log('clear cart response', response.data);
      return response.data;
    } catch (error) {
      console.error('clear cart failed', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return mutation;
}
