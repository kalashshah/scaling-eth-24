import { useHeartBit } from "@fileverse/heartbit-react";
import { notifications } from "@mantine/notifications";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount } from "wagmi";

const useHeartbitSDK = (initialHash: string) => {
  const { mintHeartBit, getTotalHeartMintsByUser, getTotalHeartBitByHash } =
    useHeartBit();
  const [startTime, setStartTime] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [totalHeartBitByHash, setTotalHeartBitByHash] = useState<number>(0);
  const [totalHeartBitByUser, setTotalHeartBitByUser] = useState<number>(0);
  const [siweData, setSiweData] = useState<any>(null);
  const [heartbitHash, setHeartbitHash] = useState<string>(initialHash);
  const { address } = useAccount();

  const getSignatureArgsHook = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign this message to setup your Gnosis Lounge shop",
      uri: window.location.origin,
      version: "1",
      chainId: 100,
    });

    const message = siweMessage.prepareMessage();
    const signature = await signer.signMessage(message);
    setSiweData({ message, signature });

    return {
      message,
      signature,
      onMintCallback: () => {
        notifications.show({
          title: "Minted Heartbit successfully",
          message: "Minted you your heartbit",
          color: "blue",
        });
      },
    };
  };

  useEffect(() => {
    const fetchBalances = async () => {
      if (address && initialHash) {
        const totalMintsByHash = await getTotalHeartBitByHash({
          hash: heartbitHash,
        });
        const totalMintsByUser = await getTotalHeartMintsByUser({
          account: address!,
          hash: heartbitHash,
        });
        setTotalHeartBitByHash(totalMintsByHash);
        setTotalHeartBitByUser(totalMintsByUser);
      }
    };
    const id = setTimeout(() => {
      fetchBalances();
    }, 2000);

    return () => clearTimeout(id);
  }, [address, heartbitHash]);

  const mintHearts = async () => {
    try {
      const endTime = Math.floor(Date.now() / 1000);
      const { message, signature } = siweData;
      await mintHeartBit({
        startTime,
        endTime,
        hash: heartbitHash,
        message,
        signature,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    mintHearts,
    setHeartbitHash,
    getSignatureArgsHook,
    totalHeartBitByHash,
    totalHeartBitByUser,
  };
};

export default useHeartbitSDK;
