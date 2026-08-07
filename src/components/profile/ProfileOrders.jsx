import React from 'react';
import { Alert, Card, CardContent, Typography } from '@mui/material';
import useProfile from '../../hocks/useProfile';

export default function ProfileOrders() {
  const { data, isError, error } = useProfile();
  const orders = data?.response?.orders || data?.data?.orders || [];

  if (isError) {
    return <Alert severity="error">{error?.message || 'Unable to load order history.'}</Alert>;
  }

  return (
    <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-4 p-6">
        <Typography variant="h6" className="font-semibold text-slate-800">Order History</Typography>
        {orders.length === 0 ? (
          <Typography variant="body2" className="text-slate-500">No orders yet.</Typography>
        ) : (
          <div className="space-y-3">
            {orders.map((order, index) => (
              <div key={order?.id || index} className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <Typography variant="subtitle2" className="font-semibold text-slate-800">Order #{order?.id || index + 1}</Typography>
                <Typography variant="body2" className="text-slate-600">Status: {order?.status || 'Processing'}</Typography>
                <Typography variant="body2" className="text-slate-600">Total: {order?.total || '$0.00'}</Typography>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
