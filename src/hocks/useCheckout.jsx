import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthaxiosInstance from '../api/Authaxiosinstance';
import useClearCart from './useClearCart';

export default function useCheckout() {
  const navigate = useNavigate();
  const clearCartMutation = useClearCart();

  return useMutation({
    mutationFn: async (payload = {}) => {
      const response = await AuthaxiosInstance.post('/Checkouts', payload);
      return response.data;
    },
    onSuccess: (data) => {
      // السيرفر بيرجع 200 حتى لو الدفع فشل، والفشل بيتحدد من data.success
      if (data?.success === false) return;

      clearCartMutation.mutate();
      navigate('/checkout/success');
    },
  });
}