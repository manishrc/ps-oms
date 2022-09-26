import { InputSelect } from "@/components/input";
import classNames from "@/lib/classnames";
import { useEffect, useState } from "react";

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
    { sizes: new Set(), colors: new Set() }
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  useEffect(() => {
    // Find part by selected color and size
    const partId = productData.ProductPartArray.find(
      (part) =>
        part.ApparelSize?.labelSize == selectedSize &&
        colorArrayToColor(part.ColorArray) === selectedColor
    )?.partId;
    onChange?.(partId);
  }, [onChange, productData, selectedColor, selectedSize]);

  return (
    <>
      {colors.size > 0 && (
        <InputSelect
          value={selectedColor}
          onChange={handleColorChange}
          id="color"
          label="Color"
        >
          <option>Select a Color</option>
          {[...colors].map((color) => (
            <option
              key={color}
              value={color}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "ring-2 ring-blue-500" : "",
                  "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                )
              }
            >
              {color}
            </option>
          ))}
        </InputSelect>
      )}
      {sizes.size > 0 && (
        <InputSelect
          value={selectedSize}
          onChange={handleSizeChange}
          id="size"
          label="Size"
        >
          {[...sizes].map((size) => (
            <option
              key={size}
              value={size}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "ring-2 ring-blue-500" : "",
                  "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                )
              }
            >
              {size}
            </option>
          ))}
        </InputSelect>
      )}
    </>
  );
}
