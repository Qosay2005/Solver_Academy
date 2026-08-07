import React from "react";
import AuthaxiosInstance from "../api/Authaxiosinstance";
import { useQuery } from "@tanstack/react-query";

export default function useCart() {
  const getItems = async () => {
    try {
      const response = await AuthaxiosInstance.get("/Carts");
      console.log('cart response', response.data);
      return response.data;
    } catch (error) {
      console.error('cart request failed', error);
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: getItems,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}