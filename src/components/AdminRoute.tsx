import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import type { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.authSlice);

  if (!user || user.type !== "administrador") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
