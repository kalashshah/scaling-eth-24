import { Addresses } from "@/shared/addresses";
import { notifications } from "@mantine/notifications";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";

const txValidatorPath = require("../lib/abi/TransactionValidator.json");

const useProof = () => {
  // const { writeContract, data: hash } = useWriteContract();
  // const { data: txReceipt, error } = useWaitForTransactionReceipt({ hash });

  // console.log({ hash, txReceipt, error });

  const { address } = useAccount();

  const { data: hasAlreadyVerified, refetch: refetchIsVerified } =
    useReadContract({
      abi: txValidatorPath.abi,
      address: Addresses.TRANSACTION_VALIDATOR_ADDR,
      functionName: "isVerified",
      args: [address!],
    });

  // console.log({ isVerified });

  // useWatchContractEvent({
  //   abi: abiPath.abi,
  //   address: Addresses.TRANSACTION_VALIDATOR_ADDR,
  //   eventName: "ProofResult",
  //   onLogs: (logs) => {
  //     console.log(`ProofResult logs:`, { logs });
  //   },
  // });

  // const executeTransaction = async (
  //   proof: any,
  //   publicSignals: Array<string>
  // ): Promise<void> => {
  //   try {
  //     console.log(
  //       `Executing transaction with proof: ${proof} and public signals: ${publicSignals}`,
  //       {
  //         abi: abiPath.abi,
  //       }
  //     );

  //     writeContract({
  //       abi: abiPath.abi,
  //       address: Addresses.TRANSACTION_VALIDATOR_ADDR_GNOSIS,
  //       functionName: "submitProof",
  //       args: [proof, publicSignals, address],
  //     });
  //   } catch (err) {
  //     console.log(`Error executing transaction: ${err}`);
  //     notifications.show({
  //       message: `Error executing transaction: ${err}`,
  //       color: "red",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (txReceipt) {
  //     console.log(
  //       `Transaction receipt: ${JSON.stringify(txReceipt.transactionHash)}`
  //     );
  //     notifications.show({
  //       message: `Transaction succeeded! Tx Hash: ${txReceipt.transactionHash}`,
  //       color: "green",
  //       autoClose: false,
  //     });
  //     refetchIsVerified();
  //   }
  // }, [txReceipt]);

  const [verified, setVerified] = useState(false);

  const isVerified = useMemo(() => {
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
      await tx.wait();

      notifications.clean();
      notifications.show({
        title: "Proof submitted",
        message: `Proof submitted successfully`,
        color: "green",
      });
      setVerified(true);
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
