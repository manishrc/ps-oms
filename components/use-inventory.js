import useSWR from "swr";
export default function useInventory(companyCode, productId, partId) {
  const { data, error } = useSWR(
    [
      `/api/ps/inventory/${companyCode}/${productId}`,
      companyCode,
      productId,
      partId,
    ],
    async function fetcher(url) {
      console.log("fetching", url);
      const res = await fetch(url);
      return res.json();
    }
  );

  const inventory = data?.["PartInventoryArray"].find(
    (part) => part.partId == partId
  );

  return {
    inventory: inventory?.quantityAvailable?.Quantity?.value,
    isLoading: !error && !data,
    isError: error,
  };
}
