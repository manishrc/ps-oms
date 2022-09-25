import { PromoStandards } from "promostandards-sdk-js";

export default async function handler(req, res) {
  const { companyCode, productId } = req.query;

  // const supplier = await prisma.supplier.findUnique({
  //   where: {
  //     id: supplierId,
  //   },
  // });

  // const psClient = new PromoStandards.Client(supplier.psConfig);
  const psClient = new PromoStandards.Client({
    name: "PCNA",
    id: process.env.PCNA_PS_ID,
    password: process.env.PCNA_PS_PASSWORD,
    endpoints: [
      {
        type: "ProductData",
        version: "2.0.0",
        url: "https://psproductdata200.pcna.online/",
      },
    ],
  });

  const psResponse = await psClient.productData.getProduct({
    productId,
    localizationCountry: "US",
    localizationLanguage: "en",
  });

  res.status(200).json(psResponse);
}
