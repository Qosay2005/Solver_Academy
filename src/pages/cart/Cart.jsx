import React from 'react'
import { Link } from 'react-router-dom'
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { AddRounded, DeleteOutlineRounded, RemoveRounded, ShoppingCartOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import useCart from '../../hocks/useCart'
import useUpdateCart from '../../hocks/useUpdateCart'
import useRemoveFromCart from '../../hocks/useRemoveFromCart'
import useClearCart from '../../hocks/useClearCart'

export default function Cart() {
  const { data, isLoading, isError } = useCart()
  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart()
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart()
  const { mutate: clearCart, isPending: isClearing } = useClearCart()
  const { t } = useTranslation()

  // شكل الـ response الفعلي: { items: [...], cartTotal }
  const cartItems = Array.isArray(data?.items) ? data.items : []
  const cartTotal = data?.cartTotal ?? cartItems.reduce((sum, item) => sum + (item?.totalPrice || 0), 0)
  const itemsCount = cartItems.reduce((sum, item) => sum + (item?.count || 0), 0)

  const handleQuantityChange = (item, nextCount) => {
    if (nextCount < 1) return
    updateCart({ productId: item.productId, count: nextCount })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <CircularProgress sx={{ color: '#DB4444' }} />
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
          <Typography variant="h5" component="h1" className="font-semibold text-zinc-900">
            {t('cart.title')}
          </Typography>
          <Typography variant="body2" className="text-zinc-500">
            {t('cart.subtitle')}
          </Typography>
        </div>

        {cartItems.length > 0 ? (
          <Button
            variant="outlined"
            onClick={() => clearCart()}
            disabled={isClearing}
            sx={{
              borderRadius: '12px',
              borderColor: '#DB4444',
              color: '#DB4444',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': {
                borderColor: '#DB4444',
                backgroundColor: 'rgba(219,68,68,0.06)',
              },
            }}
          >
            {isClearing ? <CircularProgress size={18} sx={{ color: '#DB4444' }} /> : t('cart.clear')}
          </Button>
        ) : null}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3">
            <ShoppingCartOutlined sx={{ fontSize: 34 }} className="text-zinc-300" />
            <Typography variant="body1" className="text-zinc-500">
              {t('cart.empty')}
            </Typography>
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              sx={{
                mt: 1,
                borderRadius: '12px',
                backgroundColor: '#DB4444',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#c23a3a' },
              }}
            >
              {t('cart.continueShopping')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <TableContainer
            component={Paper}
            elevation={0}
            className="rounded-[22px] border border-zinc-200/80"
            sx={{ overflowX: 'auto', height: 'fit-content' }}
          >
            <Table sx={{ minWidth: 560 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell sx={{ fontWeight: 700, color: '#3f3f46' }}>{t('cart.product') || 'Product'}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#3f3f46' }}>{t('cart.price') || 'Price'}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#3f3f46' }} align="center">
                    {t('cart.quantity')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#3f3f46' }}>{t('cart.itemTotal') || 'Total'}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#3f3f46' }} align="center">
                    {t('cart.actions') || 'Actions'}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { backgroundColor: '#fafafa' } }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: '#18181b' }}>{item.productName}</TableCell>

                    <TableCell>${Number(item.price ?? 0).toFixed(2)}</TableCell>

                    <TableCell align="center">
                      <div className="inline-flex items-center gap-1 rounded-[10px] border border-zinc-200 bg-white p-0.5">
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item, item.count - 1)}
                          disabled={isUpdating || item.count <= 1}
                          sx={{
                            color: '#DB4444',
                            '&:hover': { backgroundColor: 'rgba(219,68,68,0.08)' },
                          }}
                        >
                          <RemoveRounded fontSize="small" />
                        </IconButton>

                        <Typography
                          variant="body2"
                          className="w-6 text-center font-semibold text-zinc-800"
                        >
                          {item.count}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item, item.count + 1)}
                          disabled={isUpdating}
                          sx={{
                            color: '#DB4444',
                            '&:hover': { backgroundColor: 'rgba(219,68,68,0.08)' },
                          }}
                        >
                          <AddRounded fontSize="small" />
                        </IconButton>
                      </div>
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>${Number(item.totalPrice ?? 0).toFixed(2)}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.productId)}
                        disabled={isRemoving}
                        sx={{
                          color: '#a1a1aa',
                          '&:hover': { color: '#DB4444', backgroundColor: 'rgba(219,68,68,0.08)' },
                        }}
                      >
                        <DeleteOutlineRounded fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Order Summary */}
          <Card elevation={0} className="h-fit rounded-[24px] border border-zinc-200/80 bg-white shadow-sm">
            <CardContent className="space-y-5 p-5">
              <Typography variant="h6" className="font-bold text-zinc-900">
                {t('cart.orderSummary')}
              </Typography>

              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>
                  {itemsCount} {itemsCount === 1 ? 'قطعة' : 'قطع'}
                </span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="border-t border-dashed border-zinc-200 pt-4">
                <div className="flex items-center justify-between">
                  <Typography variant="subtitle1" className="font-bold text-zinc-900">
                    {t('cart.total')}
                  </Typography>
                  <Typography variant="h6" className="font-extrabold text-[#DB4444]">
                    ${cartTotal.toFixed(2)}
                  </Typography>
                </div>
              </div>

              <Button
                component={Link}
                to="/checkout"
                fullWidth
                variant="contained"
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
                {t('cart.checkout')}
              </Button>

              <Link to="/shop" className="block text-center text-sm font-semibold text-[#DB4444] no-underline">
                {t('cart.continueShopping')}
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}