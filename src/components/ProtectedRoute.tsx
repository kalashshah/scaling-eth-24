import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";

export const ProtectedRoute = () => {
  const { isConnected } = useAccount();

  return isConnected ? <Outlet /> : <Navigate to="/login" />;
};
