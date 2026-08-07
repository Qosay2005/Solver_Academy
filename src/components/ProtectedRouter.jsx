import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuthStore from "../hocks/authStore";

export default function ProtectedRouter({ children }) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div className="min-h-screen bg-[#dbe7ee]">{children}</div>;
}

ProtectedRouter.propTypes = {
  children: PropTypes.node.isRequired,
};
