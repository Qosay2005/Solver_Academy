import React, { useState } from 'react';
import { Alert, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import useProfile from '../../hocks/useProfile';

export default function ProfileInfo() {
  const { data, isLoading, isError, error } = useProfile();
  const profile = data?.response || data?.data || data || {};
  const [form, setForm] = useState({
    fullName: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
  });

  if (isLoading) {
    return <div className="flex justify-center py-8"><CircularProgress /></div>;
  }

  if (isError) {
    return <Alert severity="error">{error?.message || 'Unable to load profile.'}</Alert>;
  }

  return (
    <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-4 p-6">
        <Typography variant="h6" className="font-semibold text-slate-800">Profile Information</Typography>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Full Name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} fullWidth />
          <TextField label="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} fullWidth />
          <TextField label="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} fullWidth />
        </div>
        <Button variant="contained" sx={{ borderRadius: 2, backgroundColor: '#091E27', textTransform: 'none' }}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
