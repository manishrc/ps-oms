import useSWR from "swr";
export default function useDecorationLocations({ companyCode, productId }) {
  const url = `/api/ps/ppc/${companyCode}/${productId}/getConfigAndPricing`;

  const { data, error } = useSWR(url, async function fetcher(url) {
    const res = await fetch(url);
    return res.json();
  });

  // Can have duplicates.
  // @todo: Remove duplicates by locationName
  const locations =
    data?.["Envelope"]?.["Body"]?.["GetConfigurationAndPricingResponse"]?.[
      "Configuration"
    ]["LocationArray"];

  return {
    locations: locations,
    isLoading: !error && !locations,
    isError: error,
  };
}
