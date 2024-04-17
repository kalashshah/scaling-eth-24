import {
  Button,
  Column,
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

const Home = () => {
  const { transaction } = useMoralis();

  console.log(transaction);

  return (
    <div style={{ margin: 16 }}>
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
  );
};

export default Home;
