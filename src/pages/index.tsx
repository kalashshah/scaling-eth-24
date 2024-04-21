import React, { useEffect, useState } from "react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import {
  Button,
  Column,
  Row,
  Typography,
  BottomSheet,
  InputField,
  Checkbox,
} from "@cred/neopop-web/lib/components";

import {
  FontVariant,
  colorPalette,
  colorGuide,
  mainColors,
} from "@cred/neopop-web/lib/primitives";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { getDelayModule } from "../components/gnosis-pay";
import { notifications } from "@mantine/notifications";

const IndexPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  const [openLoginBottomSheet, setOpenLoginBottomSheet] =
    useState<Boolean>(false);
  const [delayModAddress, setDelayModAddress] = useState("");
  const [safeAddres, setSafeAddress] = useState("");
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [isChecked, setIsChecked] = React.useState<Boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (safeAddres && safeAddres !== "") {
        localStorage.setItem("userSafeAddress", safeAddres);
      }
      if (delayModAddress && delayModAddress !== "") {
        localStorage.setItem("userDelayModAddress", delayModAddress);
      }
    }
  }, [safeAddres, delayModAddress]);

  const handleValidateSafeAddress = async () => {
    try {
      setLoading(true);
      const delayMod = await getDelayModule(safeAddres);
      notifications.show({
        title: "Success",
        message: "Delay Module found",
        color: colorPalette.green[500],
      });
      setDelayModAddress(delayMod || "Not found");

      if (typeof window !== "undefined") {
        localStorage.setItem("userSafeAddress", safeAddres);
        localStorage.setItem("userDelayModAddress", delayMod);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
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
                margin: 20,
                width: "100%",
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
                maxLength={60}
                onChange={(e: any) => setSafeAddress(e.target.value)}
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
                {loading ? "Getting delay module.." : "Validate"}
              </Button>
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Checkbox
                isChecked={isChecked}
                colorConfig={colorGuide.lightComponents.checkbox}
                handleChange={() => setIsChecked(!isChecked)}
              >
                <Typography
                  {...FontVariant.BodyRegular16}
                  color={colorPalette.popBlack[100]}
                >
                  I agree to the{" "}
                  <a
                    href="https://app.ethsign.xyz/contract/ES-V-26gZHtDbn9jez1REFKbvk"
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    <Button
                      kind="link"
                      color={mainColors.black}
                      textStyle={{ ...FontVariant.BodyRegular16 }}
                    >
                      terms and conditions
                    </Button>
                  </a>
                </Typography>
              </Checkbox>
            </div>

            <ConnectWalletButton />
          </Column>
        </div>
      </BottomSheet>
    </>
  );
};

export default IndexPage;
