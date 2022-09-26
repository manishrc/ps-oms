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

  // const handleLocationChange = (event) => {
  //   setSelectedLocation(event.target.value);
  //   const location = locations.find(
  //     (location) => location.locationId == event.target.value
  //   );
  //   onChange?.(location);
  // };
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    const location = locations.find((location) => location.locationId == value);
    onChange?.(location);
  };

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedLocation} onChange={handleLocationChange}>
        <RadioGroup.Label className="font-medium text-gray-700 text-base">
          Decoration Location
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {locations.map((location) => (
            <RadioGroup.Option
              key={location.locationId}
              value={location.locationId}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "ring-2 ring-blue-500" : "",
                  "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1 pr-6">
                    <span className="flex flex-col justify-between">
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {location.locationName}
                      </RadioGroup.Label>

                      <RadioGroup.Description
                        as="span"
                        className="mt-6 text-sm font-medium text-gray-500"
                      >
                        {location?.DecorationArray?.length} Options
                      </RadioGroup.Description>
                    </span>
                  </span>
                  {checked ? (
                    <CheckCircleIcon
                      className="absolute top-4 right-4 h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-blue-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
