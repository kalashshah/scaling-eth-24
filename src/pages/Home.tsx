import {
  Button,
  Column,
  HorizontalSpacer,
} from "@cred/neopop-web/lib/components";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useGenerateProof } from "../hooks/useGenerateProof";
import { useState } from "react";

export const Home = () => {
  const { openAccountModal } = useAccountModal();
  const [proof, setProof] = useState<String | null>(null);

  const {generateProof} = useGenerateProof();

  console.log({generateProof});

  return (
    <Column className="v-center">
      <HorizontalSpacer n={3} />
      <Button variant="secondary" kind="elevated" size="big">
        Generate a Lounge QR
      </Button>
      <HorizontalSpacer n={3} />
      <Button
        variant="primary"
        kind="elevated"
        size="big"
        showArrow
        onClick={() => {
          openAccountModal?.();
        }}
      >
        Account Settings
      </Button>
      <>
      <Button onClick = {
        async ()=>{
          console.log("in button on click");
          const {proof, publicSignals} = await generateProof(2);
          setProof(proof);
        }
      }>
        Generate Proof
      </Button> 
      </>
      <>
       {
        proof && <p style={{color  : "white"}}>Proof is : {proof}</p>
       }
      </>
    </Column>
  );
};
