import { Addresses } from "@/shared/addresses";
import { ethers } from "ethers";
const erc20Path = require("./abi/GnosisLoungeToken.json");

function generateRandomNumber() {
  const lambdaParameter = 0.5;
  const randomNumber = -Math.log(Math.random()) / lambdaParameter;
  const clippedRandomNumber = Math.min(
    Math.max(1, Math.floor(randomNumber)),
    10
  );
  return clippedRandomNumber;
}

export const getCashback = async (safeAddress: string) => {
  if (!process.env.ACCOUNT_PRIVATE_KEY) {
    throw new Error("No private key found");
  }
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.gnosischain.com"
  );
  const signer = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider);
  const tokenContract = new ethers.Contract(
    Addresses.GLT_ADDR,
    erc20Path.abi,
    signer
  );
  let cashback = generateRandomNumber();
  const amount = ethers.utils.parseUnits(cashback.toString(), 18);
  const tx1 = await tokenContract.approve(safeAddress, amount);
  await tx1.wait();
  const tx2 = await tokenContract.transfer(safeAddress, amount);
  await tx2.wait();
  return cashback;
};
