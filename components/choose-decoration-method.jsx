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

// // Soft-goods suppliers like SanMar/Alpha might not have Decoration options
// export default function ChooseDecorationMethod({ onChange, decorations }) {
//   const [selectedDecoration, setSelectedDecoration] = useState("");

//   const handleMethodChange = (event) => {
//     setSelectedDecoration(event.target.value);
//     onChange?.();
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <InputSelect
//           id="decoration-location"
//           onChange={handleLocationChange}
//           label="Decoration Location"
//           value={selectedLocation}
//         >
//           <option value="">Select a location</option>
//           {locations
//             .sort((a, b) => a.locationRank - b.locationRank)
//             .map((location) => (
//               <option key={location.locationId} value={location.locationId}>
//                 {location.locationName}
//               </option>
//             ))}
//         </InputSelect>
//       </div>

//       <ChooseMethod decorations={decorations} />
//     </div>
//   );
// }

export default function ChooseDecorationMethod({ decorations = [], onChange }) {
  const [selectedDecorationMethod, setSelectedDecorationMethod] =
    useState(null);

  const handleChange = (value) => {
    setSelectedDecorationMethod(value);
    onChange?.(
      decorations.find((decoration) => decoration.decorationId === value)
    );
  };

  if (decorations?.length === 0) return null;

  return (
    <RadioGroup value={selectedDecorationMethod} onChange={handleChange}>
      <RadioGroup.Label className="font-medium text-gray-700 text-base">
        Decoration method
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {decorations.map((decorationMethod) => (
          <RadioGroup.Option
            key={decorationMethod.decorationId}
            value={decorationMethod.decorationId}
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
                      {decorationMethod.decorationName}
                    </RadioGroup.Label>

                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-500"
                    >
                      <>
                        <span className="block text-xs tracking-wide">
                          {decorationMethod.decorationGeometry}
                        </span>

                        <span className="block">
                          {decorationMethod.decorationWidth} x{" "}
                          {decorationMethod.decorationHeight}{" "}
                          {decorationMethod.decorationUom}
                        </span>
                      </>
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
  );
}
