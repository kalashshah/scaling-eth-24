import { Addresses } from "@/shared/addresses";
import { notifications } from "@mantine/notifications";
import { ethers } from "ethers";
import { encodeFunctionData } from "viem";
const shopPath = require("../lib/abi/ShopContract.json");
const erc20Path = require("../lib/abi/GnosisLoungeToken.json");
import { DELAY_MOD_ABI } from "@/components/abi-delay-module";

export interface NFT {
  name: string;
  image: string;
  price: number;
  address: string;
}

export function delay(timeout = 40000) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

const useShop = () => {
  const buyNft = async (nft: NFT) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        Addresses.GLT_ADDR,
        erc20Path.abi,
        signer
      );
      const shopContract = new ethers.Contract(
        Addresses.SHOP_ADDR,
        shopPath.abi,
        signer
      );

      const amount = ethers.utils.parseUnits(nft.price.toString(), 18);

      notifications.show({
        title: "Approving transaction",
        message: `Approving ${nft.price} GLT for purchase...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });
      const approvalTx = await tokenContract.approve(
        Addresses.SHOP_ADDR,
        amount
      );
      await approvalTx.wait();

      notifications.clean();
      notifications.show({
        title: "Transaction approved",
        message: `Buying ${nft.name} for ${nft.price} GLT...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });
      const transferTx = await shopContract.buyNFT(nft.address, {
        gasLimit: 300000,
      });
      await transferTx.wait();
      notifications.clean();
      notifications.show({
        title: "NFT Minted",
        message: `You have successfully minted ${nft.name}`,
        color: "green",
      });
    } catch (err: any) {
      notifications.clean();
      const statusCode = err?.response?.status;
      const errorMsg = err?.response?.data?.error;
      notifications.show({
        message: `Error ${statusCode}: ${errorMsg}`,
        color: "red",
      });
    }
  };

  const buyNftUsingDelay = async (nft: NFT) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let delayModAddress: string | null = null;

      if (typeof window !== "undefined" && localStorage) {
        delayModAddress = localStorage.getItem("userDelayModAddress");
      }

      if (!delayModAddress) {
        notifications.show({
          message: "Delay Module address not found",
          color: "red",
        });
        return;
      }

      console.log("delayModAddress", {
        delayModAddress,
        DELAY_MOD_ABI,
        signer,
      });
      const delayContract = new ethers.Contract(
        delayModAddress,
        DELAY_MOD_ABI,
        signer
      );

      console.log("amount", delayContract);
      const amount = ethers.utils.parseUnits(nft.price.toString(), 18);

      notifications.show({
        title: "Approving transaction",
        message: `Approving ${nft.price} GLT for purchase...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      console.log("Approving transaction", {
        delayModAddress,
        amount,
      });

      const approvalTxEncodedData = encodeFunctionData({
        abi: erc20Path.abi,
        functionName: "approve",
        args: [Addresses.SHOP_ADDR, amount],
      });
      console.log("sending tx 1");
      const tx = await delayContract.execTransactionFromModule(
        Addresses.GLT_ADDR,
        0,
        approvalTxEncodedData,
        0,
        { gasLimit: 300000 }
      );
      await tx.wait();
      console.log("tx 1 done");
      await delay();
      console.log("delayed");
      console.log("sending tx 2");
      const tx2 = await delayContract.executeNextTx(
        Addresses.GLT_ADDR,
        0,
        approvalTxEncodedData,
        0,
        { gasLimit: 300000 }
      );
      await tx2.wait();
      console.log("tx 2 done");
      await delay();
      console.log("delayed");

      notifications.clean();
      notifications.show({
        title: "Transaction approved",
        message: `Buying ${nft.name} for ${nft.price} GLT...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      console.log("buying nft", {
        nftAddress: nft.address,
      });
      const buyNFTEncodedData = encodeFunctionData({
        abi: shopPath.abi,
        functionName: "buyNFT",
        args: [nft.address],
      });

      const tx3 = await delayContract.execTransactionFromModule(
        Addresses.SHOP_ADDR,
        0,
        buyNFTEncodedData,
        0,
        { gasLimit: 300000 }
      );
      await tx3.wait();
      console.log("tx 3 done");
      await delay();
      console.log("delayed");

      const tx4 = await delayContract.executeNextTx(
        Addresses.SHOP_ADDR,
        0,
        buyNFTEncodedData,
        0,
        { gasLimit: 300000 }
      );
      await tx4.wait();
      console.log("tx 4 done");
      await delay();
      console.log("delayed");

      notifications.clean();
      notifications.show({
        title: "NFT Minted",
        message: `You have successfully minted ${nft.name}`,
        color: "green",
      });
    } catch (err: any) {
      console.error(err);
      notifications.clean();
      notifications.show({
        message: `Error executing transaction`,
        color: "red",
      });
    }
  };

  const skipQueue = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let delayModAddress: string | null = null;

    if (typeof window !== "undefined" && localStorage) {
      delayModAddress = localStorage.getItem("userDelayModAddress");
    }

    if (!delayModAddress) {
      notifications.show({
        message: "Delay Module address not found",
        color: "red",
      });
      return;
    }

    console.log("delayModAddress", {
      delayModAddress,
      DELAY_MOD_ABI,
      signer,
    });
    const delayContract = new ethers.Contract(
      delayModAddress,
      DELAY_MOD_ABI,
      signer
    );
    const tx = await delayContract.skipExpired({
      gasLimit: 300000,
    });
    await tx.wait();
    notifications.show({
      title: "Skipped expired transactions",
      message: `Transaction skipped`,
      color: "green",
    });
  };

  return { buyNft, buyNftUsingDelay, skipQueue };
};

export default useShop;
