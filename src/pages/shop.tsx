import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Column, Row } from "@cred/neopop-web/lib/components";
import { useAccount } from "wagmi";

const Shop = () => {
  const { isConnected } = useAccount();
  return (
    <>
      <Column>
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
          }}
        >
          <Row className="v-justify">
            <Row className="h-center v-start">
              <div
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "white",
                  marginRight: 10,
                }}
              ></div>
              <p>Gnosis Lounge</p>
            </Row>
            {isConnected ? <ConnectWalletButton /> : null}
          </Row>
        </div>
      </Column>
    </>
  );
};

export default Shop;
