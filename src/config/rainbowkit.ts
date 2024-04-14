import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { gnosis, gnosisChiado } from "wagmi/chains";

const rainbowConfig = getDefaultConfig({
  appName: "Gnosis Lounge",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [gnosis, gnosisChiado],
  ssr: false,
});

export { rainbowConfig };
