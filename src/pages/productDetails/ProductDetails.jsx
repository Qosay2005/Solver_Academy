import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alert, Button, Chip, CircularProgress, Divider, Rating, Typography, TextField } from '@mui/material';
import { ArrowBackRounded, ImageNotSupportedOutlined } from '@mui/icons-material';
import useProduct from '../../hocks/useProduct';
import useAddToCart from '../../hocks/useAddToCart';
import useGetReviews from '../../hocks/useGetReviews';
import useAddReview from '../../hocks/useAddReview';
export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useProduct(id);
  const { mutate } = useAddToCart();
  const { data: reviewsData, isLoading: reviewsLoading, isError: reviewsError } = useGetReviews(id);
  const addReviewMutation = useAddReview(id);
  const [count, setCount] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  const product = data?.response || data?.data || data || null;
  const imageUrl = product?.image || product?.imageUrl || product?.thumbnail || product?.coverImage;
  const categoryName = product?.category?.name || product?.categoryName || product?.category;
  const productName = product?.name || product?.title || product?.productName;
  const description = product?.description || product?.shortDescription || product?.summary;
  const ratingValue = product?.rate || product?.rating || product?.averageRating;
  const reviewsCount = product?.reviews?.length || product?.reviewsCount || product?.reviewCount || product?.ratingCount;
  const priceValue = product?.price || product?.priceValue || product?.currentPrice || product?.amount;
  const currency = product?.currency || product?.currencyCode || product?.currencySymbol;
  const reviews = Array.isArray(reviewsData?.response?.data)
    ? reviewsData.response.data
    : Array.isArray(reviewsData?.response)
      ? reviewsData.response
      : Array.isArray(reviewsData?.data)
        ? reviewsData.data
        : Array.isArray(reviewsData)
          ? reviewsData
          : [];

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress sx={{ color: '#DB4444' }} />
      </div>
    );
  }

  if (isError) {
    console.error('product details error', error);

    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          {error?.message || 'Unable to load product details.'}
        </Alert>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Alert severity="info">Product not found.</Alert>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 no-underline transition-colors hover:text-[#DB4444]"
      >
        <ArrowBackRounded sx={{ fontSize: 18 }} />
        الرجوع للمنتجات
      </Link>

      <div className="overflow-hidden rounded-[26px] border border-zinc-200/80 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.15)] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden bg-zinc-50">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName || 'Product'}
              className="h-full min-h-[360px] w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-2 text-zinc-400">
              <ImageNotSupportedOutlined sx={{ fontSize: 32 }} />
              <span className="text-sm font-medium">No image available</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            {categoryName ? (
              <Chip
                label={categoryName}
                size="small"
                variant="outlined"
                className="mb-4 w-fit"
                sx={{
                  borderColor: '#DB4444',
                  color: '#DB4444',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  borderRadius: '8px',
                }}
              />
            ) : null}

            {productName ? (
              <Typography variant="h4" component="h1" className="mb-3 font-extrabold tracking-tight text-zinc-900">
                {productName}
              </Typography>
            ) : null}

            <div className="mb-4 flex flex-wrap items-center gap-3">
              {ratingValue ? (
                <div className="flex items-center gap-2">
                  <Rating value={Number(ratingValue)} precision={0.1} readOnly sx={{ color: '#DB4444' }} />
                  {reviewsCount ? <span className="text-sm text-zinc-400">({reviewsCount})</span> : null}
                </div>
              ) : null}
              {priceValue != null ? (
                <Typography variant="h5" className="font-extrabold text-zinc-900">
                  {currency ? `${currency} ${priceValue}` : priceValue}
                </Typography>
              ) : null}
            </div>

            <Divider className="mb-4" />

            {description ? (
              <Typography variant="body1" className="leading-7 text-zinc-500">
                {description}
              </Typography>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-[20px] border border-zinc-200/80 bg-zinc-50 p-4 sm:flex-row sm:items-center">
            <TextField
              type="number"
              label="Count"
              variant="outlined"
              size="small"
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              inputProps={{ min: 1 }}
              className="w-full sm:w-24"
              InputProps={{
                sx: {
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  '& fieldset': { borderColor: '#e4e4e7' },
                  '&:hover fieldset': { borderColor: '#DB4444' },
                  '&.Mui-focused fieldset': { borderColor: '#DB4444' },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => mutate({ ProductId: id, Count: count })}
              fullWidth
              sx={{
                minHeight: 44,
                borderRadius: '12px',
                backgroundColor: '#DB4444',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#c23a3a', boxShadow: 'none' },
              }}
            >
              أضف للسلة
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[26px] border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-8">
        <Typography variant="h5" className="mb-4 font-extrabold text-zinc-900">المراجعات</Typography>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {reviewsLoading ? <CircularProgress size={24} sx={{ color: '#DB4444' }} /> : null}
            {reviewsError ? <Alert severity="error">Unable to load reviews.</Alert> : null}
            {reviews.length === 0 && !reviewsLoading ? (
              <Typography variant="body2" className="text-zinc-500">لا توجد مراجعات بعد. كن أول من يضيف مراجعة.</Typography>
            ) : null}
            {reviews.map((review, index) => (
              <div key={review?.id || index} className="rounded-[16px] border border-zinc-200/80 bg-zinc-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Rating value={Number(review?.rating || 0)} readOnly size="small" sx={{ color: '#DB4444' }} />
                  <Typography variant="body2" className="text-zinc-500">{review?.userName || 'User'}</Typography>
                </div>
                <Typography variant="body2" className="text-zinc-600">{review?.comment || review?.message || 'No comment provided.'}</Typography>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] border border-zinc-200/80 bg-zinc-50 p-4">
            <Typography variant="h6" className="mb-3 font-bold text-zinc-900">أضف مراجعتك</Typography>
            <div className="space-y-3">
             <div>
  <Typography variant="body2" className="mb-1.5 font-semibold text-zinc-700">
    التقييم
  </Typography>
  <div className="flex items-center gap-2">
    <Rating
      value={reviewForm.rating}
      onChange={(event, newValue) => {
        // لو المستخدم ضغط بنفس مكان النجمة المختارة، newValue بترجع null
        // فبنحافظ على آخر قيمة صحيحة بدل ما تصفر القيمة
        if (newValue !== null) {
          setReviewForm({ ...reviewForm, rating: newValue });
        }
      }}
      size="large"
      sx={{
        color: '#DB4444',
        '& .MuiRating-iconEmpty': {
          color: '#DB4444',
          opacity: 0.35,
        },
      }}
    />
    <Typography variant="body2" className="font-medium text-zinc-500">
      {reviewForm.rating} / 5
    </Typography>
  </div>
</div>
              <TextField
                label="Comment"
                multiline
                minRows={4}
                value={reviewForm.comment}
                onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={() => addReviewMutation.mutate({ rating: reviewForm.rating, comment: reviewForm.comment })}
                disabled={addReviewMutation.isPending}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: '#DB4444',
                  textTransform: 'none',
                  fontWeight: 700,
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#c23a3a' },
                }}
              >
                {addReviewMutation.isPending ? <CircularProgress size={20} color="inherit" /> : 'إرسال المراجعة'}
              </Button>
              {addReviewMutation.isError ? <Alert severity="error">{addReviewMutation.error?.message || 'Unable to submit review.'}</Alert> : null}
              {addReviewMutation.isSuccess ? <Alert severity="success">تم إرسال المراجعة بنجاح.</Alert> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}