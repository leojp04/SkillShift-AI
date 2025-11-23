import { type ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type RequireAuthProps = {
  children: ReactElement;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { usuario, token } = useAuth();
  const location = useLocation();

  if (!usuario || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
