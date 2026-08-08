import React from 'react';
import { Alert, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useCatogories from '../../hocks/useCatogories';

export default function Catogories() {
  const { data, isLoading, isError, error, refetch } = useCatogories();

  const categories = Array.isArray(data?.response?.data)
    ? data.response.data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  if (isLoading) {
    return <div className="flex justify-center py-6"><CircularProgress /></div>;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => refetch()}>Retry</Button>}>
          {error?.message || 'Unable to load categories.'}
        </Alert>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Typography variant="h6" className="font-semibold text-slate-800">Popular Categories</Typography>
        <Typography variant="body2" className="text-slate-500">Tap a category to explore related products.</Typography>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 xl:grid-cols-5">
        {categories.map((category, index) => (
          <Card key={category?.id || `${category?.name || 'category'}-${index}`} className="min-w-[180px] rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <CardContent className="p-4">
              <Typography variant="subtitle1" className="font-semibold text-slate-800">{category?.name || 'Category'}</Typography>
              <Typography variant="body2" className="mt-2 text-slate-500">Explore curated picks</Typography>
              <Button component={Link} to="/shop" size="small" sx={{ mt: 1.5, textTransform: 'none', color: '#091E27' }}>Browse</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
