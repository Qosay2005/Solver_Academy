import { useMutation } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useResetPassword() {
  return useMutation({
    mutationFn: async ({ email, newPassword }) => {
      const response = await AuthaxiosInstance.post('/auth/Account/ResetPassword', { email, newPassword });
      return response.data;
    },
  });
}
