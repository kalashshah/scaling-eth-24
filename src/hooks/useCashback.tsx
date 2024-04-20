import { notifications } from "@mantine/notifications";
import axios, { AxiosRequestConfig } from "axios";
import { useAccount } from "wagmi";

type CashbackReason = "LOUNGE_ENTRY" | "BUYING_ITEM";

const useCashback = () => {
  const { address } = useAccount();

  const getCashback = async (txHash: string, reason: CashbackReason) => {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const safeAddress = localStorage.getItem("userSafeAddress");
    console.log({ txHash, address, safeAddress });
    const res = await axios.post(
      "/api/get_cashback",
      { txHash, address, safeAddress },
      config
    );
    showCashbackNotification(reason, res.data.amount);
  };

  const showCashbackNotification = (reason: CashbackReason, amount: number) => {
    notifications.show({
      title: "Cashback received!",
      message: `You received cashback of ${amount} GLT for ${reason
        .split("_")
        .join(" ")
        .toLowerCase()}`,
      color: "green",
    });
  };

  return { getCashback };
};

export default useCashback;
