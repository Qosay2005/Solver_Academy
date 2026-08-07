import React from 'react';
import { Alert, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Rating, Typography } from '@mui/material';
import useProducts from '../../hocks/useProducts';

export default function GetProducts() {
  const { data, isLoading, isError, error, refetch } = useProducts();

  const products = Array.isArray(data?.response?.data)
    ? data.response.data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
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
          {error?.message || 'Unable to load products right now.'}
        </Alert>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Typography variant="h5" component="h2" className="font-semibold text-slate-800">
            Featured Products
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            Handpicked picks with modern design and great value.
          </Typography>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          No products available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product, index) => {
            const imageUrl = product?.image || product?.imageUrl || product?.thumbnail || product?.coverImage;
            const categoryName = product?.category?.name || product?.categoryName || product?.category;
            const productName = product?.name || product?.title || product?.productName;
            const description = product?.description || product?.shortDescription || product?.summary;
            const ratingValue = product?.rating || product?.averageRating;
            const reviewsCount = product?.reviewsCount || product?.reviewCount || product?.ratingCount;
            const priceValue = product?.price || product?.priceValue || product?.currentPrice || product?.amount;
            const currency = product?.currency || product?.currencyCode || product?.currencySymbol;

            return (
              <Card
                key={product?.id || `${productName || 'product'}-${index}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={productName || 'Product image'}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-slate-100 text-sm text-slate-400">
                    No image available
                  </div>
                )}

                <CardContent className="flex flex-col gap-3 p-5">
                  {categoryName ? (
                    <Chip label={categoryName} size="small" className="w-fit" color="primary" variant="outlined" />
                  ) : null}

                  {productName ? (
                    <Typography variant="h6" component="h3" className="font-semibold text-slate-800">
                      {productName}
                    </Typography>
                  ) : null}

                  {description ? (
                    <Typography variant="body2" className="line-clamp-3 text-slate-600">
                      {description}
                    </Typography>
                  ) : null}

                  <div className="flex items-center gap-2">
                    {ratingValue ? (
                      <>
                        <Rating value={Number(ratingValue)} precision={0.1} readOnly size="small" />
                        {reviewsCount ? <span className="text-sm text-slate-500">({reviewsCount})</span> : null}
                      </>
                    ) : null}
                  </div>

                  {priceValue != null ? (
                    <Typography variant="h6" className="mt-1 font-bold text-slate-900">
                      {currency ? `${currency} ${priceValue}` : priceValue}
                    </Typography>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
