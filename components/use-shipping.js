import useSWR from "swr";

const debugPaylog = {
  ship_to: {
    city_locality: "San Jose",
    state_province: "CA",
    postal_code: "95128",
    country_code: "US",
  },
  ship_from: {
    city_locality: "Austin",
    state_province: "TX",
    postal_code: "78756",
    country_code: "US",
  },
};

export default function useShipping(paylod = debugPaylog) {
  const { data, error } = useSWR(
    ["/api/shipping/estimate", paylod],
    async function fetcher(url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paylod),
      });
      return res.json();
    },
  );

  const options = data
    ?.filter((option) => option.error_messages.length === 0)
    ?.map((option) => ({
      carrier: option.carrier_friendly_name,
      serviceType: option.service_type,
      serviceCode: option.service_code,
      price: option.shipping_amount?.amount,
      deliveryDays: option.delivery_days,
    }))
    ?.sort((a, b) => a.price - b.price);

  // console.table(options);

  return {
    options: options,
    isLoading: !error && !options,
    isError: error,
  };
}
