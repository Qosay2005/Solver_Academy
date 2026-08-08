import React from 'react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Rating,
  Typography,
} from '@mui/material';
import { ImageNotSupportedOutlined, Inventory2Outlined, ArrowForwardRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
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
        <CircularProgress sx={{ color: '#DB4444' }} />
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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-7 w-4 rounded-[3px] bg-gradient-to-b from-[#FF6B6B] to-[#DB4444]" />
            <Typography variant="subtitle2" className="font-bold uppercase tracking-[0.12em] text-[#DB4444]">
              Our Products
            </Typography>
          </div>
          <Typography variant="h4" component="h2" className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            Featured Products
          </Typography>
          <Typography variant="body2" className="mt-1 text-zinc-500">
            Handpicked picks with modern design and great value.
          </Typography>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
          <Inventory2Outlined sx={{ fontSize: 34 }} className="text-zinc-300" />
          <Typography variant="body1" className="font-medium text-zinc-500">
            No products available right now.
          </Typography>
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
                elevation={0}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-zinc-200/80 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-[0_18px_40px_-14px_rgba(219,68,68,0.35)]"
              >
                <Link to={`/products/${product?.id}`} className="block no-underline">
                  <div className="overflow-hidden bg-zinc-50">
                    {imageUrl ? (
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={productName || 'Product image'}
                        loading="lazy"
                        className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-48 flex-col items-center justify-center gap-2 bg-zinc-100 text-zinc-400">
                        <ImageNotSupportedOutlined sx={{ fontSize: 28 }} />
                        <span className="text-xs font-medium">No image available</span>
                      </div>
                    )}
                  </div>
                </Link>

                <CardContent className="flex flex-1 flex-col gap-2.5 p-5">
                  <Link to={`/products/${product?.id}`} className="block no-underline">
                    {categoryName ? (
                      <Chip
                        label={categoryName}
                        size="small"
                        variant="outlined"
                        className="mb-1 w-fit"
                        sx={{
                          borderColor: '#DB4444',
                          color: '#DB4444',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          borderRadius: '8px',
                        }}
                      />
                    ) : null}

                    {productName ? (
                      <Typography
                        variant="h6"
                        component="h3"
                        className="font-bold leading-snug text-zinc-900 transition-colors duration-200 group-hover:text-[#DB4444]"
                      >
                        {productName}
                      </Typography>
                    ) : null}

                    {description ? (
                      <Typography variant="body2" className="line-clamp-2 text-zinc-500">
                        {description}
                      </Typography>
                    ) : null}

                    {ratingValue ? (
                      <div className="mt-1 flex items-center gap-2">
                        <Rating value={Number(ratingValue)} precision={0.1} readOnly size="small" />
                        {reviewsCount ? (
                          <span className="text-sm text-zinc-400">({reviewsCount})</span>
                        ) : null}
                      </div>
                    ) : null}

                    {priceValue != null ? (
                      <Typography variant="h6" className="mt-1 font-extrabold text-zinc-900">
                        {currency ? `${currency} ${priceValue}` : priceValue}
                      </Typography>
                    ) : null}
                  </Link>

                  {/* زر عرض التفاصيل */}
                  <Button
                    component={Link}
                    to={`/products/${product?.id}`}
                    fullWidth
                    endIcon={<ArrowForwardRounded sx={{ fontSize: 18 }} />}
                    sx={{
                      mt: 1.5,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 700,
                      py: 1,
                      color: '#DB4444',
                      border: '1.5px solid #DB4444',
                      transition: 'all .25s ease',
                      '&:hover': {
                        backgroundColor: '#DB4444',
                        color: '#fff',
                      },
                    }}
                  >
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}