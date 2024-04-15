import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Column, Row } from "@cred/neopop-web/lib/components";
import Image from "next/image";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

import lottieJson from "../../assets/onboarding_lottie.json";
import { useAccount } from "wagmi";
import GenerateProof from ".";

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
            <div
              style={{
                height: 20,
                width: 20,
                backgroundColor: "white",
                marginRight: 10,
              }}
            ></div>
            <p>Gnosis Lounge</p>
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
                    marginBottom: 5,
                  }}
                />
                <p>Exclusively for Gnosis card holders</p>
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
