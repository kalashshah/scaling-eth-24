import Moralis from "moralis";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { EvmChain, EvmTransaction } from "@moralisweb3/common-evm-utils";

export const useMoralis = () => {
  const { address } = useAccount();

  const [transaction, setTransactions] = useState<any>([]);
  const [moralisInit, setMoralisInit] = useState<boolean>(false);

  // const initMoralis = async () => {
  //   if (!moralisInit) {
  //     await Moralis.start({
  //       apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
  //       defaultEvmApiChain: EvmChain.SEPOLIA,
  //     });
  //     setMoralisInit(true);
  //   }
  // };

  const getUserTransactionsGnosis = async () => {
    try {
      const response = await fetch(
        `https://api.gnosisscan.io/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=asc&apikey=${process.env.NEXT_GNOSIS_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data.result);
      setTransactions(data.result);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // const getUserTransactions = async () => {
  //   await initMoralis();
  //   const response = await Moralis.EvmApi.transaction.getWalletTransactions({
  //     address: address!,
  //   });

  //   // console.log(response.toJSON());

  //   setTransactions(response.result);

  //   return response;
  // };

  useEffect(() => {
    // getUserTransactions();
    getUserTransactionsGnosis();
  }, []);

  return { getUserTransactionsGnosis, transaction };
};
