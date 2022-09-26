import { PromoStandards } from "promostandards-sdk-js";

export default async function handler(req, res) {
  const psClient = new PromoStandards.Client({
    endpoints: [
      {
        type: "PurchaseOrder",
        version: "1.0.0",
        url: `https://ps-oms.vercel.app/api/echo`,
      },
    ],
    format: "xml",
  });

  const psResponse = await psClient.purchaseOrder.sendPO(req.body);

  res.setHeader("Content-Type", "application/xml");

  res.status(200).send(psResponse);
}
