import React from 'react';
import { Button, Chip, Typography } from '@mui/material';
import { ReceiptLongOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useThemeStore from '../../hocks/useThemeStore';

const STATUS_COLORS = {
  processing: { bg: '#fef3c7', text: '#92400e', darkBg: 'rgba(251,191,36,0.15)', darkText: '#fbbf24' },
  shipped: { bg: '#dbeafe', text: '#1e40af', darkBg: 'rgba(59,130,246,0.15)', darkText: '#60a5fa' },
  delivered: { bg: '#dcfce7', text: '#166534', darkBg: 'rgba(34,197,94,0.15)', darkText: '#4ade80' },
  cancelled: { bg: '#fee2e2', text: '#991b1b', darkBg: 'rgba(239,68,68,0.15)', darkText: '#f87171' },
};

function formatOrderTotal(total) {
  if (total == null || total === '') return '$0.00';
  if (typeof total === 'number') return `$${total.toFixed(2)}`;
  const numeric = Number(String(total).replace(/[^0-9.-]/g, ''));
  if (!Number.isNaN(numeric)) return `$${numeric.toFixed(2)}`;
  return String(total);
}

function formatOrderDate(dateValue, language) {
  if (!dateValue) return null;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(language?.startsWith('ar') ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getStatusKey(status) {
  const normalized = String(status || 'processing').toLowerCase();
  if (normalized.includes('ship')) return 'shipped';
  if (normalized.includes('deliver')) return 'delivered';
  if (normalized.includes('cancel')) return 'cancelled';
  return 'processing';
}

export default function ProfileOrders({ orders, isRefreshing }) {
  const { t, i18n } = useTranslation();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === 'dark';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography variant="h6" className={`font-bold ${isDark ? 'text-slate-100' : 'text-zinc-900'}`}>
          {t('profile.orders.title')}
        </Typography>
        {isRefreshing ? (
          <Typography variant="caption" className={isDark ? 'text-slate-500' : 'text-zinc-500'}>
            {t('status.loading')}
          </Typography>
        ) : null}
      </div>

      {orders.length === 0 ? (
        <div
          className={`rounded-[20px] border border-dashed p-10 text-center ${
            isDark ? 'border-slate-600 bg-slate-900/40' : 'border-zinc-200 bg-zinc-50'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <ReceiptLongOutlined sx={{ fontSize: 40 }} className={isDark ? 'text-slate-600' : 'text-zinc-300'} />
            <Typography variant="body1" className={isDark ? 'text-slate-400' : 'text-zinc-500'}>
              {t('profile.orders.noOrders')}
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
              {t('profile.orders.shopMore')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, index) => {
            const orderId = order?.id ?? order?.orderId ?? index + 1;
            const statusKey = getStatusKey(order?.status);
            const statusColors = STATUS_COLORS[statusKey];
            const formattedDate = formatOrderDate(
              order?.date || order?.createdAt || order?.orderDate,
              i18n.language,
            );

            return (
              <div
                key={orderId}
                className={`rounded-[16px] border p-4 transition ${
                  isDark
                    ? 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                    : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
                } ${isRefreshing ? 'opacity-80' : ''}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <Typography variant="subtitle1" className={`font-bold ${isDark ? 'text-slate-100' : 'text-zinc-900'}`}>
                      {t('profile.orders.orderId', { id: orderId })}
                    </Typography>
                    {formattedDate ? (
                      <Typography variant="body2" className={isDark ? 'text-slate-400' : 'text-zinc-500'}>
                        {t('profile.orders.date')}: {formattedDate}
                      </Typography>
                    ) : null}
                  </div>

                  <Chip
                    label={t(`profile.orders.${statusKey}`)}
                    size="small"
                    sx={{
                      alignSelf: 'flex-start',
                      fontWeight: 700,
                      backgroundColor: isDark ? statusColors.darkBg : statusColors.bg,
                      color: isDark ? statusColors.darkText : statusColors.text,
                    }}
                  />
                </div>

                <div className={`mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 ${isDark ? 'border-slate-700' : 'border-zinc-200'}`}>
                  <Typography variant="body2" className={isDark ? 'text-slate-400' : 'text-zinc-600'}>
                    {t('profile.orders.status')}: {t(`profile.orders.${statusKey}`)}
                  </Typography>
                  <Typography variant="subtitle1" className="font-extrabold text-[#DB4444]">
                    {t('profile.orders.total')}: {formatOrderTotal(order?.total ?? order?.totalPrice ?? order?.amount)}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

ProfileOrders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  isRefreshing: PropTypes.bool,
};

ProfileOrders.defaultProps = {
  orders: [],
  isRefreshing: false,
};
