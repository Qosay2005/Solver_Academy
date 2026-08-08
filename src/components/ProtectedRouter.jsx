import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useAuthStore from '../hocks/authStore';
import useThemeStore from '../hocks/useThemeStore';

export default function ProtectedRouter({ children }) {
  const token = useAuthStore((state) => state.token);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const mode = useThemeStore((state) => state.mode);
  const location = useLocation();

  // لو الـ auth store بيدعم حالة تحميل (مثلاً بيتحقق من التوكن أول ما التطبيق يفتح)
  if (isAuthLoading) {
    return (
      <div
        className={
          mode === 'dark'
            ? 'flex min-h-screen items-center justify-center bg-slate-900'
            : 'flex min-h-screen items-center justify-center bg-zinc-50'
        }
      >
        <CircularProgress sx={{ color: '#DB4444' }} />
      </div>
    );
  }

  if (!token) {
    // بنحفظ المسار الحالي حتى نرجّع المستخدم له بعد تسجيل الدخول
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div
      className={
        mode === 'dark'
          ? 'min-h-screen bg-slate-900 text-slate-100'
          : 'min-h-screen bg-zinc-50 text-zinc-900'
      }
    >
      {children}
    </div>
  );
}

ProtectedRouter.propTypes = {
  children: PropTypes.node.isRequired,
};