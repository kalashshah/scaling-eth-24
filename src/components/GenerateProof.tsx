import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useAccount } from "wagmi";
import { notifications } from "@mantine/notifications";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useProof from "@/hooks/useProof";
import { getTransactionCount } from "wagmi/actions";
import { rainbowConfig } from "@/config/rainbowkit";
import {
  Column,
  Button,
  Row,
  Typography,
} from "@cred/neopop-web/lib/components";
import QRCode from "react-qr-code";
import { useRouter } from "next/router";
import { FontVariant, mainColors } from "@cred/neopop-web/lib/primitives";

function GenerateProof() {
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
      handleGenerateProofSendTransaction();
    }
  }, [isVerified]);

  const handleGenerateProofSendTransaction = async (e?: any) => {
    e?.preventDefault();
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
        message: "Proof generated successfully!",
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
        {!proof && <Row className="h-center">{renderSubmitButton()}</Row>}

        {proof && (
          <>
            <Typography
              className="h-center"
              {...FontVariant.CirkaHeadingBold20}
              color={mainColors.green}
            >
              Proof Generated Successfully!
            </Typography>
            <Column>
              <div
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  marginTop: 12,
                  marginBottom: 12,
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
        <Typography
          {...FontVariant.CirkaHeadingBold20}
          color={mainColors.yellow}
          style={{ marginTop: 20 }}
        >
          Steps to get yourself checked in.
        </Typography>
        <Typography {...FontVariant.BodyRegular16} style={{ marginTop: 8 }}>
          1. Connect your wallet.
          <br />
          2. Generate a proof by clicking the button above.
          <br />
          3. Mint your POAP!
          <br />
          4. Show the QR code to the lounge staff.
          <br />
          5. Enjoy the lounge!
        </Typography>
      </Column>
    </>
  );
}

export default GenerateProof;
