import { useRef, useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import classNames from "@/lib/classnames";
// Use this compoent using RHF's controlled component

/**
 * ColorSelect - component to select product color
 * @param {Object[]} colors - {name: "", bgColor: ""}
 * @param {function} onChange
 * @param {ref} inputRef
 */

export default function ColorSelect({
  value,
  onChange,
  colors = [],
  inputRef,
}) {
  const [selectedColor, setSelectedColor] = useState(value || colors[0]);

  const handleChange = (e) => {
    onChange?.(e);
    setSelectedColor(e);
  };

  return (
    <div>
      <h3 className="text-sm text-gray-600">Color</h3>
      <RadioGroup
        value={selectedColor}
        onChange={handleChange}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only" ref={inputRef}>
          Choose a color
        </RadioGroup.Label>
        <span className="flex items-center space-x-3">
          {colors.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color.name}
              className={({ active, checked }) =>
                classNames(
                  color.selectedColor,
                  active && checked ? "ring ring-offset-1" : "",
                  !active && checked ? "ring-2" : "",
                  "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                )
              }
            >
              <RadioGroup.Label as="span" className="sr-only">
                {" "}
                {color.name}{" "}
              </RadioGroup.Label>
              <span
                aria-hidden="true"
                style={{ backgroundColor: color.bgColor }}
                className={classNames(
                  "h-8 w-8 border border-black border-opacity-10 rounded-full"
                )}
              />
            </RadioGroup.Option>
          ))}
        </span>
      </RadioGroup>
    </div>
  );
}
