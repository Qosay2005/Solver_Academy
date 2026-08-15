import React, { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import useCheckout from '../../hocks/useCheckout';
import useCart from '../../hocks/useCart';

export default function Checkout() {
  const { data, isLoading, isError } = useCart();
  const checkoutMutation = useCheckout();
  const [address, setAddress] = useState('');

  // نفس شكل الـ response الفعلي المستخدم في Cart.jsx: { items: [...], cartTotal }
  const cartItems = Array.isArray(data?.items) ? data.items : [];
  const cartTotal = data?.cartTotal ?? cartItems.reduce((sum, item) => sum + (item?.totalPrice || 0), 0);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress sx={{ color: '#DB4444' }} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to load your cart for checkout.
        </Alert>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-7 w-4 rounded-[3px] bg-gradient-to-b from-[#FF6B6B] to-[#DB4444]" />
          <Typography variant="subtitle2" className="font-bold uppercase tracking-[0.12em] text-[#DB4444]">
            Checkout
          </Typography>
        </div>
        <Typography variant="h4" className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          Confirm Your Order
        </Typography>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card elevation={0} className="h-fit rounded-[24px] border border-zinc-200/80 bg-white shadow-sm">
          <CardContent className="space-y-5 p-6">
            <div>
              <Typography variant="h6" className="font-bold text-zinc-900">
                Delivery Details
              </Typography>
              <Typography variant="body2" className="mt-1 text-zinc-500">
                Confirm your details and place your order.
              </Typography>
            </div>

            <TextField
              label="Delivery Address"
              fullWidth
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&.Mui-focused fieldset': { borderColor: '#DB4444' },
                },
                '& label.Mui-focused': { color: '#DB4444' },
              }}
            />

            <div className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-4">
              <Typography variant="subtitle1" className="font-bold text-zinc-900">
                Order Summary
              </Typography>
              <div className="mt-3 space-y-2 text-sm text-zinc-600">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between">
                      <span>
                        {item?.productName || 'Item'} <span className="text-zinc-400">x {item?.count || 1}</span>
                      </span>
                      <span className="font-semibold text-zinc-800">
                        ${Number(item?.totalPrice ?? 0).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card elevation={0} className="h-fit rounded-[24px] border border-zinc-200/80 bg-white shadow-sm">
          <CardContent className="space-y-5 p-6">
            <Typography variant="h6" className="font-bold text-zinc-900">
              Ready to order?
            </Typography>

            <div className="border-t border-dashed border-zinc-200 pt-4">
              <div className="flex items-center justify-between">
                <Typography variant="subtitle1" className="font-bold text-zinc-900">
                  Total
                </Typography>
                <Typography variant="h6" className="font-extrabold text-[#DB4444]">
                  ${cartTotal.toFixed(2)}
                </Typography>
              </div>
            </div>

            <Button
              fullWidth
              variant="contained"
              onClick={() => checkoutMutation.mutate({ address })}
              disabled={checkoutMutation.isPending || cartItems.length === 0}
              sx={{
                borderRadius: '12px',
                backgroundColor: '#DB4444',
                textTransform: 'none',
                fontWeight: 700,
                py: 1.2,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#c23a3a' },
              }}
            >
              {checkoutMutation.isPending ? <CircularProgress size={20} color="inherit" /> : 'Confirm Order'}
            </Button>

            {checkoutMutation.isError ? (
              <Alert severity="error">{checkoutMutation.error?.message || 'Checkout failed.'}</Alert>
            ) : null}

            {checkoutMutation.isSuccess && checkoutMutation.data?.success === false ? (
              <Alert severity="error">{checkoutMutation.data?.message || 'Checkout failed.'}</Alert>
            ) : null}

            {checkoutMutation.isSuccess && checkoutMutation.data?.success !== false ? (
              <Alert severity="success">Order placed successfully.</Alert>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}