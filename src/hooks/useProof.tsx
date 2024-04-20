import { Addresses } from "@/shared/addresses";
import { notifications } from "@mantine/notifications";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import useCashback from "./useCashback";

const txValidatorPath = require("../lib/abi/TransactionValidator.json");

const useProof = () => {
  const { address } = useAccount();

  const { data: hasAlreadyVerified, refetch: refetchIsVerified } =
    useReadContract({
      abi: txValidatorPath.abi,
      address: Addresses.TRANSACTION_VALIDATOR_ADDR,
      functionName: "isVerified",
      args: [address!],
    });

  const [verified, setVerified] = useState(false);
  const { getCashback } = useCashback();

  const isVerified = useMemo(() => {
    console.log({ verified, hasAlreadyVerified });
    return verified || (hasAlreadyVerified as boolean);
  }, [verified, hasAlreadyVerified]);

  const executeTransaction = async (
    proof: any,
    publicSignals: Array<string>
  ) => {
    try {
      console.log(
        `Executing transaction with proof: ${proof} and public signals: ${publicSignals}`
      );
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txValidatorContract = new ethers.Contract(
        Addresses.TRANSACTION_VALIDATOR_ADDR,
        txValidatorPath.abi,
        signer
      );
      notifications.show({
        title: "Submitting proof",
        message: `Submitting proof...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });
      const tx = await txValidatorContract.submitProof(
        proof,
        publicSignals,
        address,
        {
          gasLimit: 300000,
        }
      );
      const receipt = await tx.wait();

      notifications.clean();
      notifications.show({
        title: "Proof submitted",
        message: `Proof submitted successfully`,
        color: "green",
      });
      setVerified(true);
      getCashback(receipt.transactionHash, "LOUNGE_ENTRY");
    } catch (err) {
      notifications.clean();
      notifications.show({
        message: `Error executing transaction: ${err}`,
        color: "red",
      });
    }
  };

  return { executeTransaction, isVerified };
};

export default useProof;
