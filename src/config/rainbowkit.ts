import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

const rainbowConfig = getDefaultConfig({
  appName: "Gnosis Lounge",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

export { rainbowConfig };
