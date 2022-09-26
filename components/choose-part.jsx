import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  HiCheckCircle as CheckCircleIcon,
  HiTrash as TrashIcon,
} from "react-icons/hi";
import classNames from "@/lib/classnames";

function colorArrayToColor(colorArray) {
  return colorArray?.map((c) => c.colorName).join(" / ");
}

export default function ProductOptions({ productData, onChange }) {
  const { sizes, colors } = productData?.ProductPartArray.reduce(
    (prev, curr) => {
      const size = curr.ApparelSize?.labelSize;
      const color = colorArrayToColor(curr.ColorArray);
      return {
        sizes: size ? prev.sizes.add(size) : prev.sizes,
        colors: color ? prev.colors.add(color) : prev.colors,
      };
    },
    { sizes: new Set(), colors: new Set() },
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  useEffect(() => {
    // Find part by selected color and size
    const partId = productData.ProductPartArray.find(
      (part) =>
        part.ApparelSize?.labelSize == selectedSize &&
        colorArrayToColor(part.ColorArray) === selectedColor,
    )?.partId;
    onChange?.(partId);
  }, [onChange, productData, selectedColor, selectedSize]);

  return (
    <>
      {colors.size > 0 && (
        <RadioGroup value={selectedColor} onChange={handleColorChange}>
          <RadioGroup.Label className="text-lg font-medium text-gray-900">
            Color
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            {[...colors].map((color) => (
              <RadioGroup.Option
                key={color}
                value={color}
                className={({ checked, active }) =>
                  classNames(
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "ring-2 ring-blue-500" : "",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
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
                          {color}
                        </RadioGroup.Label>
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
                        "pointer-events-none absolute -inset-px rounded-lg",
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
      {sizes.size > 0 && (
        <RadioGroup value={selectedSize} onChange={handleSizeChange}>
          <RadioGroup.Label className="text-lg font-medium text-gray-900">
            Size
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            {[...sizes].map((size) => (
              <RadioGroup.Option
                key={size}
                value={size}
                className={({ checked, active }) =>
                  classNames(
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "ring-2 ring-blue-500" : "",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
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
                          {size}
                        </RadioGroup.Label>
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
                        "pointer-events-none absolute -inset-px rounded-lg",
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
    </>
  );
}
