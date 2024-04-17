import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Column, Row, Typography } from "@cred/neopop-web/lib/components";
import Image from "next/image";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

import lottieJson from "../../assets/onboarding_lottie.json";
import { useAccount } from "wagmi";
import GenerateProof from ".";
import { FontVariant } from "@cred/neopop-web/lib/primitives";

const HomePage = () => {
  const { isConnected } = useAccount();
  return (
    <Column>
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
          {isConnected ? <ConnectWalletButton /> : null}
        </Row>
        {!isConnected ? (
          <>
            <div
              style={{
                marginBottom: 20,
              }}
            >
              <Column className="v-center">
                <Lottie
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
                />
                <Typography {...FontVariant.HeadingSemiBold16}>
                  Exclusively for Gnosis card holders
                </Typography>
              </Column>
            </div>
            <Row className="h-center v-center">
              <ConnectWalletButton />
            </Row>
          </>
        ) : (
          <>
            <GenerateProof />
          </>
        )}
      </div>
    </Column>
  );
};
export default HomePage;
