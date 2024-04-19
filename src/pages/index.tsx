import React, { useEffect, useState } from "react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import {
  Button,
  Column,
  Row,
  Typography,
} from "@cred/neopop-web/lib/components";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

import lottieJson from "../../assets/onboarding_lottie.json";
import { FontVariant, colorPalette } from "@cred/neopop-web/lib/primitives";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import bg from "../../public/gnosishome.png";
import { BottomSheet } from "@cred/neopop-web/lib/components";
import { InputField } from "@cred/neopop-web/lib/components";
import { getDelayModule } from "../components/gnosis-pay";

const IndexPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  const [openLoginBottomSheet, setOpenLoginBottomSheet] =
    useState<Boolean>(false);
  const [delayModAddress, setDelayModAddress] = useState("");
  const [safeAddres, setSafeAddress] = useState("");

  const handleValidateSafeAddress = async () => {
    console.log(safeAddres);

    try {
      const delayMod = await getDelayModule(safeAddres);
      setDelayModAddress(delayMod || "Not found");

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("userSafeAddress", safeAddres);
        localStorage.setItem("userDelayModAddress", delayMod);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      router.push("/home");
    }
  }, [isConnected]);

  return (
    <>
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
      >
        <Row className="v-justify">
          <Row className="h-center v-start">
            <Image
              src={
                "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206376/gnosis-lounge/Gemini_Generated_Image_7mzo6r7mzo6r7mzo_mtjqv7.jpg"
              }
              alt="Gnosis Lounge"
              width={50}
              height={50}
              style={{
                borderRadius: "50%",
                marginRight: 10,
              }}
            />

            <Typography {...FontVariant.CirkaHeadingBold20}>
              Gnosis Lounge
            </Typography>
          </Row>
        </Row>
      </div>
      <div>
        <Column className="v-center">
          {/* <Lottie
            loop
            animationData={lottieJson}
            play
            style={{
              height: 300,
              width: "100%",
              marginRight: 10,
              marginTop: 20,
              marginBottom: "10%",
            }}
          /> */}
          <Image
            src="/gnosishome.png"
            alt="Gnosis Lounge"
            width={400}
            height={450}
            style={{
              margin: 20,
              padding: 20,
            }}
          />
        </Column>
        <Column
          style={{
            marginLeft: 30,
          }}
        >
          <Typography
            {...FontVariant.HeadingSemiBold16}
            style={{
              fontSize: 80,
              marginBottom: 80,
            }}
          >
            Unlock...
          </Typography>
          <Typography
            {...FontVariant.HeadingSemiBold16}
            style={{
              fontSize: 70,
              marginBottom: 80,
            }}
          >
            Earn..
          </Typography>
          <Typography
            {...FontVariant.HeadingSemiBold16}
            style={{
              fontSize: 60,
              marginBottom: 80,
            }}
          >
            Redeem.
          </Typography>
        </Column>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {/* <ConnectWalletButton onClick = {()=>{
          setOpenLoginBottomSheet<>
        }} /> */}
        <Button
          variant="primary"
          kind="elevated"
          size="big"
          colorMode="light"
          onClick={() => {
            setOpenLoginBottomSheet(true);
          }}
          style={{
            width: 295,
            color: "white",
            backgroundColor: "white",
            marginLeft: 100,
          }}
          showArrow
        >
          <>Login And Unlock Rewards</>
        </Button>
      </div>

      <BottomSheet
        open={openLoginBottomSheet}
        handleClose={() => setOpenLoginBottomSheet(false)}
      >
        <div style={{ padding: 20 }}>
          <Column className="h-center v-center">
            <Row
              className="h-center v-center"
              style={{
                marginTop: 10,
                marginBottom: 10,
                padding: 10,
              }}
            >
              <Image
                src={
                  "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206376/gnosis-lounge/Gemini_Generated_Image_7mzo6r7mzo6r7mzo_mtjqv7.jpg"
                }
                alt="Gnosis Lounge"
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />

              <Typography
                {...FontVariant.CirkaHeadingBold20}
                style={{ color: "black" }}
              >
                Gnosis Lounge
              </Typography>
            </Row>
            <div
              style={{
                background: "white",
                padding: "30px",
              }}
            >
              <InputField
                autoFocus
                colorConfig={{
                  labelColor: "#0d0d0d",
                  textColor: "#000000",
                }}
                colorMode="light"
                id="text_field"
                inputMode="text"
                label="Your Safe Wallet Address"
                maxLength={30}
                onBlur={function noRefCheck() {}}
                onChange={(e: any) => setSafeAddress(e.target.value)}
                onFocus={function noRefCheck() {}}
                placeholder="enter your safe address"
                type="text"
              />
              <Button
                variant="primary"
                size="small"
                colorMode="dark"
                onClick={handleValidateSafeAddress}
                style={{
                  marginTop: 10,
                }}
              >
                Validate
              </Button>
            </div>
            <ConnectWalletButton />
          </Column>
        </div>
      </BottomSheet>
    </>
  );
};

export default IndexPage;
