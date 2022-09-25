import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  HiCheckCircle as CheckCircleIcon,
  HiTrash as TrashIcon,
} from "react-icons/hi";
import classNames from "@/lib/classnames";
import useShipping from "@/components/use-shipping";

export default function ChooseShipping({ onChange }) {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const { options = [], isLoading } = useShipping();

  const handleChange = (e) => {
    console.log(e);
    onChange?.(e);
    setSelectedDeliveryMethod(e);
  };

  return (
    <RadioGroup value={selectedDeliveryMethod} onChange={handleChange}>
      <RadioGroup.Label className="text-lg font-medium text-gray-900">
        Delivery method
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
        {options.map((deliveryMethod) => (
          <RadioGroup.Option
            key={deliveryMethod.serviceCode}
            value={deliveryMethod.serviceCode}
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
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {deliveryMethod.serviceType}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {deliveryMethod.deliveryDays} day(s)
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      ${deliveryMethod.price}
                    </RadioGroup.Description>
                  </span>
                </span>
                {checked ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-blue-600"
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
