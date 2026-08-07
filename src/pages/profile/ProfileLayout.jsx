import React from 'react';
import { Divider, Typography } from '@mui/material';
import ProfileInfo from '../../components/profile/ProfileInfo';
import ProfileOrders from '../../components/profile/ProfileOrders';

export default function ProfileLayout() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Typography variant="h4" component="h1" className="font-semibold text-slate-800">My Profile</Typography>
        <Typography variant="body2" className="text-slate-500">Manage your account details and view your orders.</Typography>
      </div>

      <div className="space-y-6">
        <ProfileInfo />
        <Divider />
        <ProfileOrders />
      </div>
    </section>
  );
}
