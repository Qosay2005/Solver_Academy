import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Chip, CircularProgress, Divider, Rating, Typography, TextField } from '@mui/material';
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
        <CircularProgress />
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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-slate-100">
          {imageUrl ? (
            <img src={imageUrl} alt={productName || 'Product'} className="h-full min-h-[320px] w-full object-cover" />
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center text-slate-400">
              No image available
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            {categoryName ? <Chip label={categoryName} color="primary" variant="outlined" className="mb-4" /> : null}
            {productName ? (
              <Typography variant="h4" component="h1" className="mb-3 font-semibold text-slate-800">
                {productName}
              </Typography>
            ) : null}

            <div className="mb-4 flex flex-wrap items-center gap-3">
              {ratingValue ? (
                <div className="flex items-center gap-2">
                  <Rating value={Number(ratingValue)} precision={0.1} readOnly />
                  {reviewsCount ? <span className="text-sm text-slate-500">({reviewsCount})</span> : null}
                </div>
              ) : null}
              {priceValue != null ? (
                <Typography variant="h5" className="font-bold text-slate-900">
                  {currency ? `${currency} ${priceValue}` : priceValue}
                </Typography>
              ) : null}
            </div>

            <Divider className="mb-4" />

            {description ? (
              <Typography variant="body1" className="leading-7 text-slate-600">
                {description}
              </Typography>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-[#eef7fb] p-4 sm:flex-row sm:items-center">
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
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    color: '#091E27',
                    '& fieldset': {
                      borderColor: '#cbd9e1',
                    },
                    '&:hover fieldset': {
                      borderColor: '#9db4c5',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#091E27',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={() => mutate({ ProductId: id, Count: count })}
                className="w-full sm:w-auto"
                sx={{
                  minHeight: 40,
                  borderRadius: 2,
                  backgroundColor: '#091E27',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 700,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#0f2d3a',
                  },
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Typography variant="h5" className="mb-4 font-semibold text-slate-800">Reviews</Typography>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {reviewsLoading ? <CircularProgress size={24} /> : null}
            {reviewsError ? <Alert severity="error">Unable to load reviews.</Alert> : null}
            {reviews.length === 0 && !reviewsLoading ? <Typography variant="body2" className="text-slate-500">No reviews yet. Be the first to leave one.</Typography> : null}
            {reviews.map((review, index) => (
              <div key={review?.id || index} className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Rating value={Number(review?.rating || 0)} readOnly size="small" />
                  <Typography variant="body2" className="text-slate-500">{review?.userName || 'User'}</Typography>
                </div>
                <Typography variant="body2" className="text-slate-600">{review?.comment || review?.message || 'No comment provided.'}</Typography>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-[#eef7fb] p-4">
            <Typography variant="h6" className="mb-3 font-semibold text-slate-800">Leave a Review</Typography>
            <div className="space-y-3">
              <TextField
                select
                label="Rating"
                value={reviewForm.rating}
                onChange={(event) => setReviewForm({ ...reviewForm, rating: Number(event.target.value) })}
                SelectProps={{ native: true }}
                fullWidth
              >
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} Stars</option>)}
              </TextField>
              <TextField
                label="Comment"
                multiline
                minRows={4}
                value={reviewForm.comment}
                onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={() => addReviewMutation.mutate({ rating: reviewForm.rating, comment: reviewForm.comment })}
                disabled={addReviewMutation.isPending}
                sx={{ borderRadius: 2, backgroundColor: '#091E27', textTransform: 'none' }}
              >
                {addReviewMutation.isPending ? <CircularProgress size={20} color="inherit" /> : 'Submit Review'}
              </Button>
              {addReviewMutation.isError ? <Alert severity="error">{addReviewMutation.error?.message || 'Unable to submit review.'}</Alert> : null}
              {addReviewMutation.isSuccess ? <Alert severity="success">Review submitted successfully.</Alert> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
