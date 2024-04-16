import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Stack,
  Text,
  Title,
  Grid,
  Input,
  Button,
  Group,
  Space,
} from "@mantine/core";
import axios, { AxiosRequestConfig } from "axios";
import { useAccount, useWatchContractEvent } from "wagmi";
import { notifications } from "@mantine/notifications";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useProof from "@/hooks/useProof";
import { Addresses } from "@/shared/addresses";
import { getTransactionCount } from "wagmi/actions";
import { rainbowConfig } from "@/config/rainbowkit";
import { Column } from "@cred/neopop-web/lib/components";
import QRCode from "react-qr-code";
const abiPath = require("../lib/abi/TransactionValidator.json");

export default function GenerateProof() {
  // const [input0, setInput0] = useState("");
  const { isConnected, address } = useAccount();
  const { executeTransaction, isVerified } = useProof();
  const [loading, setLoading] = useState<Boolean>(false);
  const [proof, setProof] = useState<string | null>(null);
  const [publicSignals, sentPublicSignals] = useState<string[] | null>(null);
  const [qrCodeString, setQRCodeString] = useState<string | null>(null);

  const handleGenerateProofSendTransaction = async (e: any) => {
    e.preventDefault();
    if (!address) {
      //TODO: show toast
      return;
    }

    setLoading(true);
    const input0 = await getTransactionCount(rainbowConfig, {
      address: address,
    });

    // const input0 = 3;

    // We will send an HTTP request with our inputs to our next.js backend to
    // request a proof to be generated.
    const data = { input0 };
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Send the HTTP request
    try {
      const res = await axios.post("/api/generate_proof", data, config);
      notifications.show({
        message: "Proof generated successfully! Submitting transaction...",
        color: "green",
      });

      // Split out the proof and public signals from the response data
      const { proof, publicSignals } = res.data;
      setProof(proof);
      sentPublicSignals(publicSignals);
      setQRCodeString(JSON.stringify({ address, proof, publicSignals }));
    } catch (err: any) {
      const statusCode = err?.response?.status;
      const errorMsg = err?.response?.data?.error;
      notifications.show({
        message: `Error ${statusCode}: ${errorMsg}`,
        color: "red",
      });
    }

    setLoading(false);
  };

  const verifyProofOnChain = async () => {
    if (!publicSignals) {
      return;
    }
    if (isVerified) {
      //TODO : navigate
      console.log("Verified!!");
      return;
    }
    try {
      // Write the transaction
      await executeTransaction(proof, publicSignals);
      notifications.show({
        message: "Proof generated successfully! Submitting transaction...",
        color: "green",
      });
    } catch (err: any) {
      const statusCode = err?.response?.status;
      const errorMsg = err?.response?.data?.error;
      notifications.show({
        message: `Error ${statusCode}: ${errorMsg}`,
        color: "red",
      });
    }
  };

  // Only allow submit if the user first connects their wallet
  const renderSubmitButton = () => {
    if (!isConnected) {
      return <ConnectWalletButton />;
    }
    return (
      <Button type="submit" onClick={handleGenerateProofSendTransaction}>
        {loading ? "loading..." : "Generate Proof & Send Transaction"}
      </Button>
    );
  };
  return (
    <>
      <Column
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            marginBottom: 20,
          }}
        >
          {
            "Fetching the number of transactions that you have done to check eligibility"
          }
        </Text>
        <Stack spacing="sm">{renderSubmitButton()}</Stack>
        {proof && (
          <>
            <Column>
              <div
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  marginTop: 20,
                  marginBottom: 20,
                  borderRadius: 16,
                }}
              >
                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                  value={qrCodeString ?? ""}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <Stack spacing="sm">
                <Button type="submit" onClick={verifyProofOnChain}>
                  Verify on chain!
                </Button>
              </Stack>
            </Column>
          </>
        )}
      </Column>
    </>
  );
}
