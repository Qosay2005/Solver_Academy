import React, { useState } from 'react';
import { Alert, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import useCheckout from '../../hocks/useCheckout';
import useCart from '../../hocks/useCart';

export default function Checkout() {
  const { data, isLoading, isError } = useCart();
  const checkoutMutation = useCheckout();
  const [address, setAddress] = useState('');

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
    return <div className="flex min-h-[70vh] items-center justify-center"><CircularProgress /></div>;
  }

  if (isError) {
    return <Alert severity="error">Unable to load your cart for checkout.</Alert>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-4 p-6">
            <Typography variant="h5" className="font-semibold text-slate-800">Checkout</Typography>
            <Typography variant="body2" className="text-slate-500">Confirm your details and place your order.</Typography>
            <TextField label="Delivery Address" fullWidth value={address} onChange={(event) => setAddress(event.target.value)} />
            <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
              <Typography variant="subtitle1" className="font-semibold text-slate-800">Order Summary</Typography>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {cartItems.length === 0 ? <p>Your cart is empty.</p> : cartItems.map((item, index) => <p key={index}>{item?.product?.name || item?.name || 'Item'} x {item?.count || 1}</p>)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-4 p-6">
            <Typography variant="h6" className="font-semibold text-slate-800">Ready to order?</Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => checkoutMutation.mutate({ address })}
              disabled={checkoutMutation.isPending || cartItems.length === 0}
              sx={{ borderRadius: 2, backgroundColor: '#091E27', textTransform: 'none' }}
            >
              {checkoutMutation.isPending ? <CircularProgress size={20} color="inherit" /> : 'Confirm Order'}
            </Button>
            {checkoutMutation.isError ? <Alert severity="error">{checkoutMutation.error?.message || 'Checkout failed.'}</Alert> : null}
            {checkoutMutation.isSuccess ? <Alert severity="success">Order placed successfully.</Alert> : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
