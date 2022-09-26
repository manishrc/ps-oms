import { useState } from "react";
import ChooseProduct from "@/components/choose-part";
import ChooseDecoration from "@/components/choose-decoration";
import { useRouter } from "next/router";

export default function ProductConfiguration({ productData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [partId, setPartId] = useState();
  const { query } = useRouter();

  return (
    <div>
      <ChooseProduct
        productData={productData}
        onChange={(partId) => {
          setPartId(partId);
          console.log("partId", partId);
        }}
      />
      <ChooseDecoration
        productId={query.productId}
        companyCode={query.companyCode}
        partId={partId}
      />
    </div>
  );
}
