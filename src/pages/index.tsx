import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Stack, Text, Title, Grid, Input, Group, Space } from "@mantine/core";
import axios, { AxiosRequestConfig } from "axios";
import { useAccount, useWatchContractEvent } from "wagmi";
import { notifications } from "@mantine/notifications";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useProof from "@/hooks/useProof";
import { Addresses } from "@/shared/addresses";
import { getTransactionCount } from "wagmi/actions";
import { rainbowConfig } from "@/config/rainbowkit";
import {
  Column,
  VerticalSpacer,
  Button,
  Row,
} from "@cred/neopop-web/lib/components";
import QRCode from "react-qr-code";
import { useRouter } from "next/router";
const abiPath = require("../lib/abi/TransactionValidator.json");

export default function GenerateProof() {
  // const [input0, setInput0] = useState("");
  const { isConnected, address } = useAccount();
  const { executeTransaction, isVerified } = useProof();
  const [loading, setLoading] = useState<Boolean>(false);
  const [proof, setProof] = useState<string | null>(null);
  const [publicSignals, sentPublicSignals] = useState<string[] | null>(null);
  const [qrCodeString, setQRCodeString] = useState<string | null>(null);
  const [allowMint, setAllowMint] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isVerified) {
      setAllowMint(true);
    }
  }, [isVerified]);

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
        message: "Submitted transaction successfully!",
        color: "green",
      });
      setAllowMint(true);
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
      <Button
        onClick={handleGenerateProofSendTransaction}
        variant="primary"
        kind="elevated"
        size="big"
        colorMode="light"
      >
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
        <Row className="h-center">{renderSubmitButton()}</Row>
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
              <Row className="v-justify">
                {!allowMint && (
                  <Button
                    onClick={verifyProofOnChain}
                    variant="primary"
                    kind="elevated"
                    size="big"
                    colorMode="light"
                  >
                    Verify on chain!
                  </Button>
                )}
                {allowMint && (
                  <>
                    <Button
                      variant="primary"
                      kind="elevated"
                      size="big"
                      colorMode="light"
                      showArrow
                      style={{ marginRight: 10 }}
                      onClick={() => {
                        router.push("/lounge");
                      }}
                    >
                      Continue to Lounge
                    </Button>
                    <a
                      href="https://poap.website/and-whom-evidence"
                      target={"_blank"}
                      rel={"noreferrer"}
                    >
                      <Button
                        variant="primary"
                        kind="elevated"
                        size="big"
                        colorMode="light"
                        showArrow
                      >
                        Mint your POAP!
                      </Button>
                    </a>
                  </>
                )}
              </Row>
            </Column>
          </>
        )}
      </Column>
    </>
  );
}
