import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthaxiosInstance from '../api/Authaxiosinstance';

export default function useAddReview(productId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addReview', productId],
    mutationFn: async ({ rating, comment }) => {
      if (!productId) {
        throw new Error('Product id is missing.');
      }

      const trimmedComment = comment?.trim();

      if (!rating || rating < 1 || rating > 5) {
        throw new Error('Please choose a rating between 1 and 5.');
      }
    useEffect(()=>{
    console.log("hello world");
    },[])
      if (!trimmedComment) {
        throw new Error('Please write a comment before submitting.');
       
      }

    // بعد (صح):
const response = await AuthaxiosInstance.post(`/Products/${productId}/reviews`, {
  Rating: rating,
  Comment: trimmedComment,
});

      return response.data;
    },
    onSuccess: () => {
      // نحدث لستة المراجعات
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      // ونحدث بيانات المنتج نفسه (لو الـ rating/reviewsCount محسوبة من الباك اند)
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
}