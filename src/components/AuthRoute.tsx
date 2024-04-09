import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";

export const AuthRoute = () => {
  const { isConnected } = useAccount();

  return !isConnected ? <Outlet /> : <Navigate to="/" />;
};
