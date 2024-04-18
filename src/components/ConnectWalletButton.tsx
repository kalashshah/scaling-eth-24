"use client";

import { Button } from "@cred/neopop-web/lib/components";
import { useAccount, useEnsName } from "wagmi";

export const ConnectWalletButton = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const renderConnectText = () => {
    if (isConnected) {
      if (ensName) return ensName;
      const start = address?.slice(0, 6);
      const end = address?.slice(address.length - 4, address.length);
      return `${start}...${end}`;
    } else {
      return "Connect Wallet";
    }
  };

  return (
    <Button
      variant="primary"
      kind="elevated"
      size="big"
      colorMode="light"
      onClick={() => {
        openConnectModal?.();
        openAccountModal?.();
      }}
    >
      {renderConnectText()}
    </Button>
  );
};

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
