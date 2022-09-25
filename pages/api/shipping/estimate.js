const carrier_ids = [
  // "se-3115691",
  "se-3115692",
];

export default async function handler(req, res) {
  const { ship_from, ship_to, weight = { value: 1, unit: "pound" } } = req.body;

  const response = await fetch("https://api.shipengine.com/v1/rates/estimate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.SHIPENGINE_API_KEY,
    },
    body: JSON.stringify({
      carrier_ids,
      from_country_code: ship_from.country_code,
      from_postal_code: ship_from.postal_code,
      from_city_locality: ship_from.city_locality,
      from_state_province: ship_from.state_province,
      to_country_code: ship_to.country_code,
      to_postal_code: ship_to.postal_code,
      to_city_locality: ship_to.city_locality,
      to_state_province: ship_to.state_province,
      weight,
      // dimensions: {
      //   unit: "inch",
      //   length: 0,
      //   width: 0,
      //   height: 0,
      // },
      confirmation: "none",
      address_residential_indicator: "unknown",
      ship_date: new Date().toISOString(),
    }),
  });

  res.status(200).json(await response.json());
}
