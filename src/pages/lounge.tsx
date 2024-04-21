import { heartbitOptions } from "@/config/heartbit";
import useGLT from "@/hooks/useGLT";
import useHeartbitSDK from "@/hooks/useHeartbitSDK";
import useShop, { NFT } from "@/hooks/useShop";
import { Addresses } from "@/shared/addresses";
import {
  Header,
  ElevatedCard,
  Column,
  Row,
  Button,
  Typography,
  VerticalSpacer,
} from "@cred/neopop-web/lib/components";
import { FontVariant } from "@cred/neopop-web/lib/primitives";
import { HeartBit } from "@fileverse/heartbit-react";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const nfts: Array<NFT> = [
  {
    name: "Kitai Air NFT",
    image:
      "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206376/gnosis-lounge/Gemini_Generated_Image_ta5hmita5hmita5h_yxtwx9.jpg",
    price: 10,
    address: Addresses.KITAI_NFT_ADDR,
  },
  // {
  //   name: "Hazure Air NFT",
  //   image:
  //     "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206379/gnosis-lounge/Gemini_Generated_Image_7rqfs87rqfs87rqf_jwaijk.jpg",
  //   price: 20,
  //   address: Addresses.HAZURE_NFT_ADDR,
  // },
];

const Lounge = () => {
  const { buyNftUsingDelay } = useShop();
  const { getSignatureArgsHook } = useHeartbitSDK(nfts[0].address);

  const handleMint = async (nft: NFT) => {
    notifications.show({
      title: "Minting NFT",
      message: "Minting your NFT, please wait...",
      color: "blue",
    });
    await buyNftUsingDelay(nft);
  };

  const router = useRouter();

  const { formattedBalance, refetchBalance } = useGLT();

  return (
    <>
      <div style={{ margin: 16 }}>
        <Row className="h-center">
          <Header
            heading="Shop on Gnosis Lounge"
            description="pay using gnosis card and get exclusive rewards"
            onBackClick={() => {
              router.push("/dashboard");
            }}
          />
          <Row className="v-center">
            <Typography
              {...FontVariant.BodyRegular16}
              color={"white"}
              style={{ marginLeft: 6, marginBottom: 8, marginRight: 10 }}
            >
              {formattedBalance.toString()}
            </Typography>

            <Image
              src={
                "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206376/gnosis-lounge/Gemini_Generated_Image_7mzo6r7mzo6r7mzo_mtjqv7.jpg"
              }
              alt="Gnosis Lounge"
              width={20}
              height={20}
              style={{
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
          </Row>
        </Row>

        <Column className="v-center">
          {nfts.map((nft) => {
            return (
              <>
                <ElevatedCard
                  edgeColors={{
                    bottom: "#244B3B",
                    right: "#244B3B",
                  }}
                  style={{
                    width: "400px",
                    height: "400px",
                    marginTop: 15,
                  }}
                >
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    width={397}
                    height={397}
                    style={{ zIndex: 0, position: "absolute" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 10,
                      paddingTop: 16,
                      paddingBottom: 16,
                      paddingLeft: 16,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <Typography
                      {...FontVariant.BodyRegular16}
                      color={"white"}
                      style={{ marginLeft: 6, marginBottom: 8 }}
                    >
                      {nft.name}
                    </Typography>
                    <Row>
                      <Button
                        kind="elevated"
                        showArrow
                        variant="primary"
                        onClick={() => handleMint(nft)}
                      >
                        Buy for {nft.price}
                      </Button>
                      <VerticalSpacer n={3} />
                      <HeartBit
                        coreOptions={heartbitOptions}
                        getSignatureArgsHook={getSignatureArgsHook}
                        hash={nft.address}
                      />
                    </Row>
                  </div>
                </ElevatedCard>
              </>
            );
          })}
        </Column>
      </div>
    </>
  );
};

export default Lounge;
