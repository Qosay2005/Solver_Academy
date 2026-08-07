import React from "react";
import AuthaxiosInstance from "../api/Authaxiosinstance";
import { useQuery } from "@tanstack/react-query";

export default function useCart() {
  const getItems = async () => {
    try {
      const response = await AuthaxiosInstance.get("/Carts");

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getItems,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}