import {
  Button,
  Column,
  ElevatedCard,
  Header,
  HorizontalSpacer,
  Row,
  Typography,
} from "@cred/neopop-web/lib/components";
import Image from "next/image";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { FontVariant } from "@cred/neopop-web/lib/primitives";
import { useMoralis } from "@/hooks/useMoralis";
import usePOAP from "@/hooks/usePOAP";
import lottieJson from "../../assets/transactions_empty.json";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

function truncateHexString(hexString: string): string {
  const prefix = hexString.slice(0, 4); // Extract the first two characters
  const suffix = hexString.slice(-4); // Extract the last two characters

  return prefix + "..." + suffix;
}

const Home = () => {
  const { transaction } = useMoralis();
  const { userPoaps } = usePOAP();
  const router = useRouter();

  return (
    <div style={{ margin: 16 }}>
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
        <Button
          onClick={() => {
            //TODO : set navigation properly
            router.push("/auth-page");
          }}
          variant="primary"
          kind="elevated"
          size="sm"
          colorMode="light"
        >
          Checkin To Lounge
        </Button>
      </Row>

      <Column
        style={{
          marginTop: 16,
        }}
      >
        {userPoaps.length != 0 && (
          <>
            <Typography
              {...FontVariant.BodyRegular32}
              color={"white"}
              style={{ marginLeft: 6, marginBottom: 8, marginRight: 10 }}
            >
              Your POAP Collection
            </Typography>
            <Row
              style={{
                overflowY: "hidden",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {userPoaps.map((e) => {
                return (
                  <div
                    style={{
                      margin: 10,
                    }}
                  >
                    <ElevatedCard
                      backgroundColor="#AE275F"
                      edgeColors={{
                        bottom: "#5C1532",
                        right: "#851E49",
                      }}
                      style={{
                        width: "100%",
                        height: "100",
                        margin: 10,
                      }}
                    >
                      <Column
                        className="h-center, v-center"
                        style={{
                          padding: 10,
                        }}
                      >
                        <div
                          style={{
                            width:
                              "150px" /* Set width and height for the circular image */,
                            height: "150px",
                            borderRadius: "50%" /* Make the image circular */,
                            overflow: "hidden",
                            margin: 10,
                          }}
                        >
                          <img
                            src={e.event.image_url}
                            alt="Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        {e.event.name}
                      </Column>
                    </ElevatedCard>
                  </div>
                );
              })}
            </Row>
          </>
        )}
        {
          <>
            <Typography
              {...FontVariant.BodyRegular32}
              color={"white"}
              style={{ marginLeft: 6, marginBottom: 8, marginRight: 10 }}
            >
              Your Latest Transactions
            </Typography>
            {transaction.length > 0 ? (
              <Typography
                {...FontVariant.BodyRegular16}
                color={"white"}
                style={{ marginLeft: 6, marginBottom: 8, marginRight: 10 }}
              >
                {transaction.map((e) => {
                  var transactionObject = e.toJSON();
                  return (
                    <>
                      <ElevatedCard
                        backgroundColor="#AE275F"
                        edgeColors={{
                          bottom: "#5C1532",
                          right: "#851E49",
                        }}
                        style={{
                          width: "100%",
                          margin: 10,
                        }}
                      >
                        <Row
                          style={{
                            margin: 10,
                          }}
                        >
                          {truncateHexString(transactionObject.from)}
                        </Row>
                      </ElevatedCard>
                    </>
                  );
                })}
              </Typography>
            ) : (
              <>
                {/* TODO: replace asset */}
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
              </>
            )}
          </>
        }
      </Column>
    </div>
  );
};

export default Home;
