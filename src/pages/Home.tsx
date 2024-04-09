import {
  Button,
  Column,
  HorizontalSpacer,
} from "@cred/neopop-web/lib/components";
import { useAccountModal } from "@rainbow-me/rainbowkit";

export const Home = () => {
  const { openAccountModal } = useAccountModal();

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
    </Column>
  );
};
