import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const checkout = async (payload) => {
    const response = await AuthaxiosInstance.post('/Checkouts', payload);
    return response.data;
  };

  return useMutation({
    mutationFn: checkout,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });

       if (response?.url) {
        window.location.href = response.url;
        return;
      }

      navigate('/checkout-success');
      console.log(response.data.url)
    },
  });
}