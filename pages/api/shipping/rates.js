const carrier_ids = ["se-3115691", "se-3115692"];

export default async function handler(req, res) {
  const { ship_from, ship_to, packages } = req.body;

  const response = await fetch("https://api.shipengine.com/v1/rates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.SHIPENGINE_API_KEY,
    },
    body: JSON.stringify({
      rate_options: {
        carrier_ids,
      },
      shipment: {
        ship_from,
        ship_to,
      },
      packages,
    }),
  });

  res.status(200).json(await response.json());
}
