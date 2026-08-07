import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useUpdateCart() {
  const queryClient = useQueryClient();

  const updateCart = async (values) => {
    try {
      const response = await AuthaxiosInstance.put(`/Carts/${values.id}`, { Count: values.count });
      console.log('update cart response', response.data);
      return response.data;
    } catch (error) {
      console.error('update cart failed', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return mutation;
}
