import { isTest } from "@/shared/addresses";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { gnosis, sepolia } from "wagmi/chains";

const chains: any = isTest ? [sepolia] : [gnosis];

const rainbowConfig = getDefaultConfig({
  appName: "Gnosis Lounge",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  chains,
  ssr: false,
});

export { rainbowConfig };
