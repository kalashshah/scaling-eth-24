import { Html, Head, Main, NextScript } from "next/document";
import Moralis from "moralis";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>Gnosis Lounge</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
