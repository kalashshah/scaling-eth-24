import { Addresses } from "@/shared/addresses";
import { notifications } from "@mantine/notifications";
import { ethers } from "ethers";
const shopPath = require("../lib/abi/ShopContract.json");
const erc20Path = require("../lib/abi/GnosisLoungeToken.json");

export interface NFT {
  name: string;
  image: string;
  price: number;
  address: string;
}

//user clicks on buy -> first approval is called, after approval mint is called automatically
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

  return { buyNft };
};

export default useShop;
