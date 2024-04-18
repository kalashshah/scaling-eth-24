import {
  Button,
  Column,
  ElevatedCard,
  Row,
  Typography,
} from "@cred/neopop-web/lib/components";
import Image from "next/image";

import { FontVariant } from "@cred/neopop-web/lib/primitives";
import { useMoralis } from "@/hooks/useMoralis";
import usePOAP from "@/hooks/usePOAP";
import lottieJson from "../../assets/transactions_empty.json";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import withAuth from "@/components/withAuth";
import Card from "@/components/Card";
import { useAccountModal } from "@rainbow-me/rainbowkit";
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
  const { openAccountModal } = useAccountModal();

  return (
    <div style={{ margin: 16 }}>
      <Row className="v-justify">
        <div onClick={openAccountModal}>
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
        </div>
        <Button
          onClick={() => {
            router.push("/proof");
          }}
          variant="primary"
          kind="elevated"
          size="sm"
          colorMode="light"
        >
          Checkin To Lounge
        </Button>
      </Row>

      <Card />

      <Column
        style={{
          marginTop: 16,
        }}
      >
        {userPoaps.length != 0 && (
          <>
            <Typography
              {...FontVariant.CirkaHeadingBold20}
              color={"white"}
              style={{
                marginLeft: 6,
                marginBottom: 4,
                marginRight: 10,
                marginTop: 20,
              }}
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
                      backgroundColor="#244B3B"
                      edgeColors={{
                        bottom: "#E0E0E0",
                        right: "#E0E0E0",
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

                        <Typography {...FontVariant.CapsBold10}>
                          {e.event.name}
                        </Typography>
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
              {...FontVariant.CirkaHeadingBold20}
              color={"white"}
              style={{
                marginLeft: 6,
                marginBottom: 8,
                marginRight: 10,
                marginTop: 20,
              }}
            >
              Your Latest Transactions
            </Typography>
            {transaction.length > 0 ? (
              <>
                {transaction.map((e: any) => {
                  return (
                    <>
                      <ElevatedCard
                        backgroundColor="black"
                        edgeColors={{ bottom: "#244B3B", right: "#244B3B" }}
                        style={{ width: "95%", margin: 20 }}
                      >
                        <Row style={{ margin: 10 }}>
                          <Typography
                            {...FontVariant.BodyRegular16}
                            color={"white"}
                            style={{
                              marginLeft: 6,
                              marginBottom: 8,
                            }}
                          >
                            {truncateHexString(e.from)}
                          </Typography>
                        </Row>
                      </ElevatedCard>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {/* TODO: replace asset */}
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
              </>
            )}
          </>
        }
      </Column>
    </div>
  );
};

export default withAuth(Home);
