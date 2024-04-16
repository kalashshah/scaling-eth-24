import { Addresses } from "@/shared/addresses";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";

const abiPath = require("../lib/abi/TransactionValidator.json");

const useProof = () => {
  const { writeContract, data: hash } = useWriteContract();
  const { data: txReceipt, error } = useWaitForTransactionReceipt({ hash });

  console.log({ hash, txReceipt, error });

  const { address } = useAccount();

  const { data: isVerified, refetch: refetchIsVerified } = useReadContract({
    abi: abiPath.abi,
    address: Addresses.TRANSACTION_VALIDATOR_ADDR,
    functionName: "isVerified",
    args: [address!],
  });

  console.log({ isVerified });

  useWatchContractEvent({
    abi: abiPath.abi,
    address: Addresses.TRANSACTION_VALIDATOR_ADDR,
    eventName: "ProofResult",
    onLogs: (logs) => {
      console.log(`ProofResult logs:`, { logs });
    },
  });

  const executeTransaction = async (
    proof: any,
    publicSignals: Array<string>
  ): Promise<void> => {
    try {
      console.log(
        `Executing transaction with proof: ${proof} and public signals: ${publicSignals}`,
        {
          abi: abiPath.abi,
        }
      );

      writeContract({
        abi: abiPath.abi,
        address: Addresses.TRANSACTION_VALIDATOR_ADDR,
        functionName: "submitProof",
        args: [proof, publicSignals, address],
      });
    } catch (err) {
      console.log(`Error executing transaction: ${err}`);
      notifications.show({
        message: `Error executing transaction: ${err}`,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (txReceipt) {
      console.log(
        `Transaction receipt: ${JSON.stringify(txReceipt.transactionHash)}`
      );
      notifications.show({
        message: `Transaction succeeded! Tx Hash: ${txReceipt.transactionHash}`,
        color: "green",
        autoClose: false,
      });
      refetchIsVerified();
    }
  }, [txReceipt]);

  return { executeTransaction, txReceipt, isVerified };
};

export default useProof;
