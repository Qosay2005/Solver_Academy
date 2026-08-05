import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosinstans';
export default function useCatogories() {
   const getCatogories = async ()=>{
      try{
        const response = await axiosInstance.get(`/Categories`);
        return response.data;
      }catch(error){
          console.log(error)
      }
    }
   const query = useQuery({
        queryKey:['catogories'],
        queryFn:getCatogories,
        staleTime:1000*60*5
    })
  return query;
   
}
