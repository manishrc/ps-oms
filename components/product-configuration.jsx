import { useState } from "react";
import ProductOptions from "@/components/choose-part";

export default function ProductConfiguration({ productData }) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div>
      <ProductOptions productData={productData} />
    </div>
  );
}
