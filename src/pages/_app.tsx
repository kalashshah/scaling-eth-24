import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { queryClient } from "@/config/query-client";
import { rainbowConfig } from "@/config/rainbowkit";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // We'll be using Wagmi sending our transaction and Mantine for CSS
  // and notifications

  return (
    <MantineProvider withNormalizeCSS>
      <WagmiProvider config={rainbowConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <Notifications />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  );
}
