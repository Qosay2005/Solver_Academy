import React, { useRef } from 'react';
import { Alert, Button, Card, CircularProgress, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos, CategoryOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useCatogories from '../../hocks/useCatogories';

export default function Catogories() {
  const { data, isLoading, isError, error, refetch } = useCatogories();
  const scrollRef = useRef(null);

  const categories = Array.isArray(data?.response?.data)
    ? data.response.data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <CircularProgress sx={{ color: '#DB4444' }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          {error?.message || 'Unable to load categories.'}
        </Alert>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-[#FFFFFF]">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-7 w-4 rounded-[3px] bg-gradient-to-b from-[#FF6B6B] to-[#DB4444]" />
        <Typography
          variant="subtitle2"
          className="font-bold uppercase tracking-[0.12em] text-[#DB4444]"
        >
          Categories
        </Typography>
      </div>

      {/* Heading + scroll controls */}
      <div className="mb-8 flex items-end justify-between">
        <Typography variant="h4" className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          Browse By Category
        </Typography>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => scrollByAmount(-260)}
            aria-label="Scroll categories left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all duration-200 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white hover:shadow-md active:scale-95"
          >
            <ArrowBackIosNew sx={{ fontSize: 15 }} />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(260)}
            aria-label="Scroll categories right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all duration-200 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white hover:shadow-md active:scale-95"
          >
            <ArrowForwardIos sx={{ fontSize: 15 }} />
          </button>
        </div>
      </div>

      {/* Category strip */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-3"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map((category, index) => (
          <Card
            key={category?.id || `${category?.name || 'category'}-${index}`}
            component={Link}
            to="/shop"
            elevation={0}
            className="group flex min-w-[136px] flex-1 basis-[136px] flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-200 bg-white py-8 no-underline transition-all duration-300 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-[0_12px_30px_-8px_rgba(219,68,68,0.45)] sm:min-w-[156px]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[#DB4444]">
              {category?.image ? (
                <img
                  src={category.image}
                  alt={category?.name || 'Category'}
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <CategoryOutlined
                  sx={{ fontSize: 26 }}
                  className="text-zinc-500 transition-colors duration-300 group-hover:text-white"
                />
              )}
            </span>

            <Typography
              variant="body2"
              className="font-semibold text-zinc-700 transition-colors duration-300 group-hover:text-[#DB4444]"
            >
              {category?.name || 'Category'}
            </Typography>
          </Card>
        ))}
      </div>
    </section>
  );
}