import React from 'react';
import { useMutation } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useAddToCart() {
  const addToCart = async (data) => {
    try {
      const response = await AuthaxiosInstance.post('/Carts', data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: addToCart,
  });

  return mutation;
}
