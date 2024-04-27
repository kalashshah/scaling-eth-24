import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <title>Gnosis Lounge</title>
      <body style={{ width: "420px" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
