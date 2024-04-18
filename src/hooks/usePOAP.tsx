import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface event {
  id: string;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  supply: number;
}

interface POAP {
  event: event;
}

const usePOAP = () => {
  const [userPoaps, setUserPoaps] = useState<POAP[]>([]);
  const { address } = useAccount();

  const getUserPOAPs = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_POAP_API_KEY ?? "",
      },
    };

    try {
      const response = await fetch(
        `https://api.poap.tech/actions/scan/${address}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log({ data });
      setUserPoaps(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPOAPs();
  }, []);

  return { userPoaps };
};

export default usePOAP;
