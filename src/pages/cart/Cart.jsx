import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, AlertTitle, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useCart from '../../hocks/useCart'
import useUpdateCart from '../../hocks/useUpdateCart'
import useRemoveFromCart from '../../hocks/useRemoveFromCart'
import useClearCart from '../../hocks/useClearCart'

export default function Cart() {
  const { data, isLoading, isError } = useCart()
  const { mutate: updateCart } = useUpdateCart()
  const { mutate: removeFromCart } = useRemoveFromCart()
  const { mutate: clearCart } = useClearCart()
  const { t } = useTranslation()

  const cartItems = Array.isArray(data?.response?.data)
    ? data.response.data
    : Array.isArray(data?.response)
      ? data.response
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : []

  const parsePrice = (value) => {
    const numericValue = Number(String(value).replace(/[^0-9.-]/g, ''))
    return Number.isFinite(numericValue) ? numericValue : 0
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const product = item?.product || item
    const priceValue = product?.price || product?.priceValue || product?.currentPrice || item?.price || item?.amount || 0
    const countValue = item?.count || item?.Count || item?.quantity || 1
    return sum + parsePrice(priceValue) * countValue
  }, 0)

  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to fetch cart items. Please try again later.
        </Alert>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Typography variant="h5" component="h1" className="font-semibold text-slate-800">
            {t('cart.title')}
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            {t('cart.subtitle')}
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
            {t('cart.clear')}
          </Button>
        ) : null}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          {t('cart.empty')}
          <div className="mt-4 flex flex-col items-center justify-center gap-3">
            <div className="rounded-full bg-[#eef7fb] p-3 text-[#091E27]">
              <span className="text-2xl">🛒</span>
            </div>
            <Typography variant="body1" className="text-slate-600">Your cart is empty right now.</Typography>
            <Button component={Link} to="/shop" variant="contained" sx={{ borderRadius: 2, backgroundColor: '#091E27', textTransform: 'none' }}>
              {t('cart.continueShopping')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-4">
            {cartItems.map((item, index) => {
              const product = item?.product || item
              const productName = product?.name || product?.title || product?.productName || 'Product'
              const imageUrl = product?.image || product?.imageUrl || product?.thumbnail || product?.coverImage
              const priceValue = product?.price || product?.priceValue || product?.currentPrice || item?.price || item?.amount
              const countValue = item?.count || item?.Count || item?.quantity || 1
              const itemId = item?.id || product?.id || index

              return (
                <Card key={itemId} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    {imageUrl ? (
                      <img src={imageUrl} alt={productName} className="h-24 w-full rounded-[16px] object-cover sm:h-24 sm:w-24" />
                    ) : (
                      <div className="flex h-24 w-full items-center justify-center rounded-[16px] bg-[#eef7fb] text-sm text-slate-500 sm:w-24">
                        No image
                      </div>
                    )}

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <Typography variant="h6" component="h2" className="font-semibold text-slate-800">
                            {productName}
                          </Typography>
                          <Typography variant="body2" className="text-slate-500">
                            {t('cart.quantity')}: {countValue}
                          </Typography>
                        </div>
                        {priceValue != null ? (
                          <Typography variant="subtitle1" className="font-semibold text-[#091E27]">
                            {priceValue}
                          </Typography>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <TextField
                          type="number"
                          label={t('cart.quantity')}
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
                          {t('cart.remove')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="h-fit rounded-[24px] border border-slate-200 bg-white p-1 shadow-sm">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Typography variant="h6" className="font-semibold text-slate-800">
                  {t('cart.orderSummary')}
                </Typography>
                <span className="rounded-full bg-[#eef7fb] px-2.5 py-1 text-xs font-semibold text-[#091E27]">
                  {t('cart.secure')}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('cart.tax')}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('cart.promotion')}</span>
                  <span className="text-emerald-600">-$0.00</span>
                </div>
              </div>

              <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-3">
                <Typography variant="body2" className="mb-2 font-semibold text-slate-700">
                  {t('cart.coupon')}
                </Typography>
                <div className="flex gap-2">
                  <TextField size="small" fullWidth placeholder="SAVE10" />
                  <Button variant="contained" sx={{ borderRadius: 2, backgroundColor: '#091E27', textTransform: 'none' }}>
                    {t('cart.apply')}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <Typography variant="subtitle1" className="font-semibold text-slate-800">
                  {t('cart.total')}
                </Typography>
                <Typography variant="subtitle1" className="font-semibold text-[#091E27]">
                  ${total.toFixed(2)}
                </Typography>
              </div>

              <Button
                component={Link}
                to="/checkout"
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#091E27',
                  textTransform: 'none',
                  fontWeight: 700,
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: '#0f2d3a',
                  },
                }}
              >
                {t('cart.checkout')}
              </Button>

              <Link to="/" className="block text-center text-sm font-semibold text-[#091E27]">
                {t('cart.continueShopping')}
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}
