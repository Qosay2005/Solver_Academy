import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CheckoutSuccess() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-4 p-8 text-center">
          <Typography variant="h4" className="font-semibold text-slate-800">Order confirmed!</Typography>
          <Typography variant="body1" className="text-slate-600">Your order has been placed successfully. You will receive a confirmation shortly.</Typography>
          <Button component={Link} to="/" variant="contained" sx={{ borderRadius: 2, backgroundColor: '#091E27', textTransform: 'none' }}>Shop More</Button>
        </CardContent>
      </Card>
    </section>
  );
}
