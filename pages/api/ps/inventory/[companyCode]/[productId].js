import { PromoStandards } from "promostandards-sdk-js";

export default async function handler(req, res) {
  const { companyCode, productId } = req.query;

  const psClient = JSON.parse(process.env.PS_CREDENTIALS)[companyCode];
  if (!psClient) {
    res.status(404).send("Supplier not found");
    return;
  }
  const inventoryEndpoint = psClient.endpoints.find(
    (endpoint) => endpoint.type === "Inventory"
  );
  if (!inventoryEndpoint) {
    res.status(404).send("Inventory endpoint not found");
    return;
  }

  const supplier = new PromoStandards.Client(psClient);
  const psResponse = await supplier.inventory.getInventoryLevels({
    productId: productId,
    productIDtype: "Supplier",
  });

  const reshapeInventoryData = (response) => {
    const inventory = response?.Envelope?.Body?.Reply;
    const productId = inventory.productID;
    const PartInventoryArray = inventory?.ProductVariationInventoryArray?.map(
      (part) => ({
        partId: part.partID,
        quantityAvailable: {
          Quantity: {
            value: part.quantityAvailable,
          },
        },
      })
    );
    return {
      productId,
      PartInventoryArray,
    };
  };

  const inventory =
    inventoryEndpoint.version === "1.2.1"
      ? reshapeInventoryData(psResponse)
      : psResponse?.Envelope?.Body?.GetInventoryLevelsResponse?.Inventory;

  inventory &&
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=3000"
      // s-maxage = 10 minutes
      // stale-while-revalidate = 50 minutes
    );

  inventory
    ? res.status(200).json(inventory)
    : res.status(404).send("Not Found");
}
