import { Typography } from "@cred/neopop-web/lib/components";
import { FontVariant, colorPalette } from "@cred/neopop-web/lib/primitives";
import Image from "next/image";
import React from "react";
import { useAccount } from "wagmi";

const Card = () => {
  const { address } = useAccount();

  return (
    <div
      style={{
        width: 400,
        height: 250,
        marginTop: 20,
        position: "relative",
      }}
    >
      <Image
        src="/gnosis-card.png"
        alt="gnosis-card"
        width={400}
        height={250}
        style={{
          borderRadius: 16,
        }}
      />
      <div style={{ position: "absolute", zIndex: 1, bottom: 10, right: 10 }}>
        <Typography
          {...FontVariant.HeadingBold20}
          style={{ paddingTop: 80, paddingLeft: 10 }}
        >
          {address?.slice(0, 10)}...
          {address?.slice(address.length - 10, address.length)}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
