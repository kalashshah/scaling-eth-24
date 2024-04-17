import { Addresses } from "@/shared/addresses";
import { notifications } from "@mantine/notifications";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useReadContract,
  useTransactionConfirmations,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
const shopPath = require("../lib/abi/ShopContract.json");
const erc20Path = require("../lib/abi/GnosisLoungeToken.json");

//user clicks on buy -> first approval is called, after approval mint is called automatically

const useGLT = () => {
  const { address: userAddress } = useAccount();
  const { data: balance, refetch: refetchBalance } = useReadContract({
    abi: erc20Path.abi,
    address: Addresses.GLT_ADDR,
    functionName: "balanceOf",
    args: [userAddress!],
  });

  const formattedBalance: BigInt = useMemo(() => {
    if (!balance) return BigInt(0);
    return BigInt(balance as any) / BigInt(10 ** 18);
  }, [balance]);

  return { formattedBalance, refetchBalance };
};

export default useGLT;
