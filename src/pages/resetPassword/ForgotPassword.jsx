import React, { useState } from 'react';
import { Alert, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import useResetPassword from '../../hocks/useResetPassword';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const mutation = useResetPassword();
  const message = mutation.isSuccess ? 'Password reset request completed.' : mutation.isError ? mutation.error?.message || 'Unable to reset password.' : '';

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-4 p-8">
          <Typography variant="h5" className="font-semibold text-slate-800">Reset Password</Typography>
          <Typography variant="body2" className="text-slate-500">Enter your email and a new password to reset your account.</Typography>
          <TextField label="Email" fullWidth value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextField label="New Password" type="password" fullWidth value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
          <Button variant="contained" onClick={() => mutation.mutate({ email, newPassword })} disabled={mutation.isPending} sx={{ borderRadius: 2, backgroundColor: '#091E27', textTransform: 'none' }}>
            {mutation.isPending ? <CircularProgress size={20} color="inherit" /> : 'Reset Password'}
          </Button>
          {message ? <Alert severity={mutation.isError ? 'error' : 'success'}>{message}</Alert> : null}
        </CardContent>
      </Card>
    </section>
  );
}
