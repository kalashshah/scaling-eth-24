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
import { HeartBitProvider } from "@fileverse/heartbit-react";
import { heartbitOptions } from "@/config/heartbit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withNormalizeCSS>
      <WagmiProvider config={rainbowConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <HeartBitProvider coreOptions={heartbitOptions}>
              <Notifications />
              <Component {...pageProps} />
            </HeartBitProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  );
}
