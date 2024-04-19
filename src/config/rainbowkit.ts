import { isTest } from "@/shared/addresses";
import { connectorsForWallets, getDefaultConfig, } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { gnosis, sepolia } from "wagmi/chains";

const chains: any = isTest ? [sepolia] : [gnosis];

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, walletConnectWallet, safeWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  }
);


const rainbowConfig = getDefaultConfig(
  {
  appName: "Gnosis Lounge",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  chains,
  ssr: false,
});

export { rainbowConfig };
