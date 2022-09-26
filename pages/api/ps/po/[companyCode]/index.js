import { PromoStandards } from "promostandards-sdk-js";

export default async function handler(req, res) {
  const { companyCode, productId } = req.query;

  const psConfig = JSON.parse(process.env.PS_CREDENTIALS)[companyCode];

  const psClient = new PromoStandards.Client(psConfig);

  console.log("req.body", req.body);

  const psResponse = await psClient.purchaseOrder.sendPO(req.body);

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(psResponse);
}
