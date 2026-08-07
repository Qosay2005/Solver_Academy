import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Chip, CircularProgress, Divider, Rating, Typography } from '@mui/material';
import useProduct from '../../hocks/useProduct';

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch } = useProduct(id);

  const product = data?.response?.data || data?.data || data || null;
  const imageUrl = product?.image || product?.imageUrl || product?.thumbnail || product?.coverImage;
  const categoryName = product?.category?.name || product?.categoryName || product?.category;
  const productName = product?.name || product?.title || product?.productName;
  const description = product?.description || product?.shortDescription || product?.summary;
  const ratingValue = product?.rating || product?.averageRating;
  const reviewsCount = product?.reviewsCount || product?.reviewCount || product?.ratingCount;
  const priceValue = product?.price || product?.priceValue || product?.currentPrice || product?.amount;
  const currency = product?.currency || product?.currencyCode || product?.currencySymbol;

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
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
          </div>
        </div>
      </div>
    </section>
  );
}
