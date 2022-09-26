import { useState } from "react";
import ProductOptions from "@/components/product-options";

export default function ProductConfiguration({ productData }) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div>
      <ProductOptions productData={productData} />
    </div>
  );
}
