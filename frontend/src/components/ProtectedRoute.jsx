import React, { useRef } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const alertedRef = useRef(false);

  if (!isLoggedIn) {
    if (!alertedRef.current) {
      alert("로그인이 필요합니다.");
      alertedRef.current = true;
    }
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;

