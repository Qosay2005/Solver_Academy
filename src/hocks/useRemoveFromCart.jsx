import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const removeFromCart = async (id) => {
    try {
      const response = await AuthaxiosInstance.delete(`/Carts/${id}`);
      console.log('remove from cart response', response.data);
      return response.data;
    } catch (error) {
      console.error('remove from cart failed', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return mutation;
}
