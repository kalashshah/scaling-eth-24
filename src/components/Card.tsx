import { Typography } from "@cred/neopop-web/lib/components";
import { FontVariant, colorPalette } from "@cred/neopop-web/lib/primitives";
import Image from "next/image";
import React from "react";
import { useAccount } from "wagmi";

const Card = () => {
  const { address } = useAccount();
  const safeAddress = localStorage.getItem("userSafeAddress");

  return (
    <div
      style={{
        width: "100%",
        marginTop: 20,
        position: "relative",
      }}
    >
      <Image
        src="/gnosis-card.png"
        alt="gnosis-card"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto", borderRadius: 16 }}
      />
      <div style={{ position: "absolute", zIndex: 1, bottom: 10, right: 10 }}>
        <Typography
          {...FontVariant.HeadingBold20}
          style={{ paddingTop: 80, paddingLeft: 10 }}
        >
          {safeAddress?.slice(0, 10)}...
          {safeAddress?.slice(safeAddress.length - 10, safeAddress.length)}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
