import { Addresses } from "@/shared/addresses";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
  useTransactionConfirmations,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
const shopPath = require("../lib/abi/ShopContract.json");
const erc20Path = require("../lib/abi/GnosisLoungeToken.json");

export interface NFT {
  name: string;
  image: string;
  price: number;
  address: string;
}

const useShop = () => {
  const [currentNFT, setCurrentNFT] = useState<NFT | null>(null);
  const { data: hashShop, writeContractAsync: writeShopContract } =
    useWriteContract();
  const { data: hashErc20, writeContractAsync: writeERC20Contract } =
    useWriteContract();
  const { data: erc20AllowReceipt } = useWaitForTransactionReceipt({
    hash: hashErc20,
  });

  const buyNft = async (nft: NFT) => {
    setCurrentNFT(nft);
    await writeERC20Contract({
      address: Addresses.GLT_ADDR,
      abi: erc20Path.abi,
      functionName: "approve",
      args: [Addresses.SHOP_ADDR, BigInt(nft.price)],
    });
  };

  const mintNFT = async () => {
    if (currentNFT) {
      await writeShopContract({
        address: Addresses.SHOP_ADDR,
        abi: shopPath.abi,
        functionName: "buyNFT",
        args: [currentNFT.address],
      });
    }
  };

  useEffect(() => {
    if (erc20AllowReceipt?.status === "success") {
      notifications.show({
        title: "Tokens approved for purchase",
        message: `Buying ${currentNFT?.name} for ${currentNFT?.price} GLT...`,
        color: "green",
      });
      mintNFT();
    }
  }, [erc20AllowReceipt]);

  return { buyNft };
};

export default useShop;
