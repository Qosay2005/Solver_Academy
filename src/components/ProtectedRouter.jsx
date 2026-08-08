import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../hocks/authStore';
import useThemeStore from '../hocks/useThemeStore';

export default function ProtectedRouter({ children }) {
  const token = useAuthStore((state) => state.token);
  const mode = useThemeStore((state) => state.mode);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div className={mode === 'dark' ? 'min-h-screen bg-slate-900 text-slate-100' : 'min-h-screen bg-[#dbe7ee] text-[#091E27]'}>{children}</div>;
}

ProtectedRouter.propTypes = {
  children: PropTypes.node.isRequired,
};
