import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

const rainbowConfig = getDefaultConfig({
  appName: "Gnosis Lounge",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  chains: [sepolia],
  ssr: false,
});

export { rainbowConfig };
