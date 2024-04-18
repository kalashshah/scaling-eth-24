import {
  Column,
  Header,
  Row,
  Typography,
} from "@cred/neopop-web/lib/components";
import Image from "next/image";

import { FontVariant } from "@cred/neopop-web/lib/primitives";
import GenerateProof from "@/components/GenerateProof";
import withAuth from "@/components/withAuth";
import { useRouter } from "next/router";

const ProofPage = () => {
  const router = useRouter();

  return (
    <Column
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
      }}
    >
      <Header
        onBackClick={() => {
          router.push("/home");
        }}
      />
      <Row className="v-justify">
        <Row className="h-center v-start">
          <Image
            src={
              "https://res.cloudinary.com/drlni3r6u/image/upload/v1713206376/gnosis-lounge/Gemini_Generated_Image_7mzo6r7mzo6r7mzo_mtjqv7.jpg"
            }
            alt="Gnosis Lounge"
            width={50}
            height={50}
            style={{
              borderRadius: "50%",
              marginRight: 10,
            }}
          />
          <Typography {...FontVariant.CirkaHeadingBold20}>
            Gnosis Lounge
          </Typography>
        </Row>
      </Row>
      <GenerateProof />
    </Column>
  );
};
export default withAuth(ProofPage);
