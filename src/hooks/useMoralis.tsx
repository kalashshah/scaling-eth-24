import Moralis from "moralis";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { EvmChain, EvmTransaction } from "@moralisweb3/common-evm-utils";

export const useMoralis = () => {
  const { address } = useAccount();

  const [transaction, setTransactions] = useState<EvmTransaction[]>([]);
  const [moralisInit, setMoralisInit] = useState<boolean>(false);

  const initMoralis = async () => {
    if (!moralisInit) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        defaultEvmApiChain: EvmChain.SEPOLIA,
      });
      setMoralisInit(true);
    }
  };

  const getUserTransactions = async () => {
    await initMoralis();
    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address: address!,
    });

    console.log(response.toJSON());

    setTransactions(response.result);

    return response;
  };

  useEffect(() => {
    getUserTransactions();
  }, []);

  return { getUserTransactions, transaction };
};
