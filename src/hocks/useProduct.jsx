import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosinstans';

export default function useProduct(id) {
  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(`/Products/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ['product', id],
    queryFn: getProduct,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(id),
  });

  return query;
}
