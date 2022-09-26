import { useState } from "react";
import ChoosePart from "@/components/choose-part";
import ChooseDecorationLocation from "@/components/choose-decoration-location";
import ChooseDecorationMethod from "@/components/choose-decoration-method";
import { useRouter } from "next/router";

export default function ProductConfiguration({ productData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [partId, setPartId] = useState();
  const [decorationLocation, setDecorationLocation] = useState();
  const [decorationMethod, setDecorationMethod] = useState();
  const { query } = useRouter();

  return (
    <div>
      <ChoosePart
        productData={productData}
        onChange={(partId) => {
          setPartId(partId);
          console.log("partId", partId);
        }}
      />
      <ChooseDecorationLocation
        productId={query.productId}
        companyCode={query.companyCode}
        partId={partId}
        onChange={(decorationLocation) => {
          setDecorationLocation(decorationLocation);
          console.log("decorationLocation", decorationLocation);
        }}
      />
      <ChooseDecorationMethod
        decorations={decorationLocation?.DecorationArray}
        onChange={(decorationLocationMethod) => {
          setDecorationMethod(decorationLocationMethod);
          console.log("decorationMethod", decorationMethod);
        }}
      />
    </div>
  );
}
