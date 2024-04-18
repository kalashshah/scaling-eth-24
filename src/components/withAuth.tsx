import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { isConnected } = useAccount();

    useEffect(() => {
      if (!isConnected) router.push("/");
    }, [isConnected]);

    return isConnected ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};
export default withAuth;
