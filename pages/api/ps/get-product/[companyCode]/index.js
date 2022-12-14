import { PromoStandards } from "promostandards-sdk-js";

export default async function handler(req, res) {
  const { companyCode, productId } = req.query;

  const psConfig = JSON.parse(process.env.PS_CREDENTIALS)[companyCode];

  const psClient = new PromoStandards.Client(psConfig);

  const psResponse = await psClient.productData.getProductSellable({
    isSellable: true,
  });

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=3600"
  );
  res.setHeader("Content-Type", "application/json");

  res.status(200).json(psResponse);
}
