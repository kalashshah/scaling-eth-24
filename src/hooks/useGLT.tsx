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

import { encodeFunctionData, erc20Abi, parseAbi, parseEther } from "viem";

const DELAY_MOD_ABI = require("../components/abi-delay-module");
const erc20Path = require("../lib/abi/GnosisLoungeToken.json");

//user clicks on buy -> first approval is called, after approval mint is called automatically

export function delay(timeout = 40000) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

const useGLT = () => {
  const { address: userAddress } = useAccount();
  const [delayModAddress, setDelayModAddress] = useState("");
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

  //Gnosis Pay

  const createUnsignedErc20Tx = (to: `0x${string}`, value: bigint) => {
    const data = encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, value],
    });
    console.log("UnsignedTXData", data);
    return data;
  };

  function GnosisPayErc20Transfer(recipientAddress: `0x${string}`) {
    //getDelayModule

    if (typeof window !== "undefined" && window.localStorage) {
      // localStorage.setItem("userSafeAddress", safeAddres);
      setDelayModAddress(localStorage.getItem("userDelayModAddress") ?? "");
    }

    const {
      data: queueData,
      error: queueError,
      writeContract: queueWriteContract,
    } = useWriteContract();
    const {
      data: execData,
      error: execError,
      writeContract: execWriteContract,
    } = useWriteContract();

    console.log("queueData:", queueData);
    console.log("queueError:", queueError);
    console.log("queueWriteContract:", queueWriteContract);

    console.log("execData:", execData);
    console.log("execError:", execError);
    console.log("execWriteContract:", execWriteContract);

    const makeErc20TransferViaDelayModule = async () => {
      try {
        // in this case we just decided to send a very low amount
        const amount = parseEther("0.01");
        // here we're creating an "unsigned" tx that we're later sending as data to the delay mod
        const unsignedTxData = createUnsignedErc20Tx(
          recipientAddress as `0x{string}`,
          amount
        );

        console.log("delay mod add", delayModAddress);

        // This is sending the tx to the safe through the delay mod
        await queueWriteContract({
          address: delayModAddress as `0x{string}`,
          abi: DELAY_MOD_ABI,
          functionName: "execTransactionFromModule",
          args: [Addresses.GLT_ADDR, 0, unsignedTxData, 0],
        });

        // Now we need to wait a bit since the delay module slows down the speed at which we can communicate with it (if you followed the tutorial video the delay module is setup with 10seconds, the delay will wait 20s just to be extra sure)
        await delay();

        // This is executing the transaction on the delay module
        await execWriteContract({
          address: delayModAddress as `0x${string}`,
          abi: DELAY_MOD_ABI,
          functionName: "executeNextTx",
          args: [Addresses.GLT_ADDR, 0, unsignedTxData, 0],
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
  }

  return { formattedBalance, refetchBalance };
};

export default useGLT;
