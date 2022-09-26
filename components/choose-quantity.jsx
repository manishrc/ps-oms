import useInventory from "@/components/use-inventory";
import { InputText } from "./input";

export default function ChooseQuantity({ companyCode, productId, partId }) {
  const { inventory } = useInventory(companyCode, productId, partId);

  return (
    <div>
      <InputText
        label="Quantity"
        type="number"
        max={inventory || 1000}
        defaultValue={1}
      />
      {
        <div className="mt-1 text-gray-500">
          Available Inventory:{" "}
          {(inventory && new Intl.NumberFormat("en-US").format(inventory)) ||
            "N/A"}
        </div>
      }
    </div>
  );
}
