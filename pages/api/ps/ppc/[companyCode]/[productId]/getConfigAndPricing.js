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
      {
        type: "ProductPricingAndConfiguration",
        version: "1.0.0",
        url: "https://pspriceconfig100.pcna.online",
      },
    ],
  });

  const psResponse =
    await psClient.productPricingAndConfiguration.getConfigurationAndPricing({
      productId,
      currency: "USD",
      fobId: "15068",
      priceType: "Net",
      configurationType: "Decorated",
      localizationCountry: "US",
      localizationLanguage: "en",
    });

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=3600"
  );

  res.status(200).json(psResponse);
}
