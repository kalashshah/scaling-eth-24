import { getCashback } from "@/lib/getCashback";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({ error: "Request has no body" });
  }

  const { txHash, address, safeAddress } = body;
  // TODO: Check address, txHash, safeAddress for valid transaction

  if (
    txHash === undefined ||
    address === undefined ||
    safeAddress === undefined
  ) {
    return res.status(403).json({ error: "Invalid inputs" });
  }
  const amount = await getCashback(safeAddress);
  if (amount === undefined) {
    return res.status(403).json({ error: "Error generating cashback" });
  }

  res.setHeader("Content-Type", "text/json");
  res.status(200).json(amount);
}
