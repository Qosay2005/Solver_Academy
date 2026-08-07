import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useAddToCart() {
  const queryClient = useQueryClient();

  const addToCart = async (data) => {
    try {
      const response = await AuthaxiosInstance.post('/Carts', data);
      console.log('add to cart response', response.data);
      return response.data;
    } catch (error) {
      console.error('add to cart failed', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return mutation;
}
