import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../api/axiosinstans'

export default function useCatogories() {
  const getCategories = async () => {
    const response = await axiosInstance.get('/Categories')

    return response.data.response.data
  }

  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  })
}