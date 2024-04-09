import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "@cred/neopop-web/lib/components";

export const Login = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  return (
    <div>
      <div style={{ marginLeft: 10 }}>
        <Button
          variant="primary"
          kind="elevated"
          size="big"
          colorMode="light"
          onClick={() => {
            openConnectModal?.();
            openAccountModal?.();
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
