import useDecorationLocations from "@/components/use-decoration-locations";
import { useState } from "react";
import { InputSelect } from "@/components/input";
import { RadioGroup } from "@headlessui/react";
import {
  HiCheckCircle as CheckCircleIcon,
  HiTrash as TrashIcon,
} from "react-icons/hi";
import classNames from "@/lib/classnames";
import useShipping from "@/components/use-shipping";

// Soft-goods suppliers like SanMar/Alpha might not have Decoration options
export default function ChooseDecorationLocation({
  onChange,
  productId,
  companyCode,
}) {
  const { locations = [] } = useDecorationLocations({
    // companyCode: "HIT",
    // productId: "5790",
    // companyCode: "PCNA",
    // productId: "1601-91",
    // companyCode: "PCNA",
    // productId: "1921-09",
    companyCode,
    productId,
  });
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    const location = locations.find(
      (location) => location.locationId == event.target.value,
    );
    onChange?.(location);
  };

  return (
    <div className="space-y-6">
      <InputSelect
        id="decoration-location"
        onChange={handleLocationChange}
        label="Decoration Location"
        value={selectedLocation}
      >
        <option value="">Select a location</option>
        {locations
          .sort((a, b) => a.locationRank - b.locationRank)
          .map((location) => (
            <option key={location.locationId} value={location.locationId}>
              {location.locationName}
            </option>
          ))}
      </InputSelect>
    </div>
  );
}
