"use client";

import { Addresses } from "@/shared/addresses";
import { useEffect, useMemo, useState } from "react";
import { useReadContract } from "wagmi";

const erc20Path = require("../lib/abi/GnosisLoungeToken.json");

const useGLT = () => {
  const [safeAddress, setSafeAddress] = useState<string | null>(null);
  const { data: balance, refetch: refetchBalance } = useReadContract({
    abi: erc20Path.abi,
    address: Addresses.GLT_ADDR,
    functionName: "balanceOf",
    args: [safeAddress!],
  });

  useEffect(() => {
    if (localStorage) {
      const getSafeAddress = localStorage.getItem("userSafeAddress");
      setSafeAddress(getSafeAddress);
      refetchBalance();
    }
  }, []);

  const formattedBalance: BigInt = useMemo(() => {
    if (!balance) return BigInt(0);
    return BigInt(balance as any) / BigInt(10 ** 18);
  }, [balance]);

  return { formattedBalance, refetchBalance };
};

export default useGLT;
