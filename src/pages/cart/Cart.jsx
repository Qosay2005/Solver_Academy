import React from 'react'
import { Alert, AlertTitle, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import useCart from '../../hocks/useCart'
import useUpdateCart from '../../hocks/useUpdateCart'
import useRemoveFromCart from '../../hocks/useRemoveFromCart'
import useClearCart from '../../hocks/useClearCart'

export default function Cart() {
  const { data, isLoading, isError } = useCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: clearCart } = useClearCart();

  const cartItems = Array.isArray(data?.response?.data)
    ? data.response.data
    : Array.isArray(data?.response)
      ? data.response
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [];

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to fetch cart items. Please try again later.
        </Alert>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Typography variant="h5" component="h1" className="font-semibold text-slate-800">
            Your Cart
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            Review the items you have added and continue with your order.
          </Typography>
        </div>

        {cartItems.length > 0 ? (
          <Button
            variant="contained"
            onClick={() => clearCart()}
            sx={{
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
            Clear Cart
          </Button>
        ) : null}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          Your cart is empty right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {cartItems.map((item, index) => {
            const product = item?.product || item;
            const productName = product?.name || product?.title || product?.productName || 'Product';
            const imageUrl = product?.image || product?.imageUrl || product?.thumbnail || product?.coverImage;
            const priceValue = product?.price || product?.priceValue || product?.currentPrice || item?.price || item?.amount;
            const countValue = item?.count || item?.Count || item?.quantity || 1;
            const itemId = item?.id || product?.id || index;

            return (
              <Card key={itemId} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                {imageUrl ? (
                  <img src={imageUrl} alt={productName} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-[#eef7fb] text-sm text-slate-500">
                    No image available
                  </div>
                )}

                <CardContent className="flex flex-col gap-3">
                  <Typography variant="h6" component="h2" className="font-semibold text-slate-800">
                    {productName}
                  </Typography>
                  <Typography variant="body2" className="text-slate-600">
                    Quantity: {countValue}
                  </Typography>
                  {priceValue != null ? (
                    <Typography variant="body1" className="font-semibold text-[#091E27]">
                      {priceValue}
                    </Typography>
                  ) : null}

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <TextField
                      type="number"
                      label="Qty"
                      variant="outlined"
                      size="small"
                      value={countValue}
                      onChange={(event) => updateCart({ id: itemId, count: Number(event.target.value) })}
                      inputProps={{ min: 1 }}
                      className="w-full sm:w-24"
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: '#ffffff',
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
                      variant="outlined"
                      onClick={() => removeFromCart(itemId)}
                      sx={{
                        borderRadius: 2,
                        borderColor: '#cbd9e1',
                        color: '#091E27',
                        textTransform: 'none',
                        fontWeight: 700,
                        '&:hover': {
                          borderColor: '#091E27',
                          backgroundColor: '#eef7fb',
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
