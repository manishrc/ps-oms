import { useRouter } from "next/router";
import { useState } from "react";
import ChoosePart from "@/components/choose-part";
import ChooseDecorationLocation from "@/components/choose-decoration-location";
import ChooseDecorationMethod from "@/components/choose-decoration-method";
import ChooseArtwork from "@/components/choose-artwork";
import { InputAddress } from "@/components/input";

export default function ProductConfiguration({ productData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [partId, setPartId] = useState();
  const [decorationLocation, setDecorationLocation] = useState();
  const [decorationMethod, setDecorationMethod] = useState();
  const [artworkFile, setArtworkFile] = useState();
  const [address, setAddress] = useState();
  const { query } = useRouter();

  return (
    <div className="space-y-6">
      <ChoosePart
        productData={productData}
        onChange={(partId) => {
          console.log("partId", partId);
          setPartId(partId);
        }}
      />
      <ChooseDecorationLocation
        productId={query.productId}
        companyCode={query.companyCode}
        partId={partId}
        onChange={(decorationLocation) => {
          console.log("decorationLocation", decorationLocation);
          setDecorationLocation(decorationLocation);
        }}
      />
      <ChooseDecorationMethod
        decorations={decorationLocation?.DecorationArray}
        onChange={(decorationLocationMethod) => {
          console.log("decorationLocationMethod", decorationLocationMethod);
          setDecorationMethod(decorationLocationMethod);
        }}
      />
      <ChooseArtwork
        minHeight={decorationMethod?.decorationHeight}
        minWidth={decorationMethod?.decorationWidth}
        onChange={(artworkFile) => {
          console.log("artworkFile", artworkFile);
          setArtworkFile(artworkFile);
        }}
      />
      <InputAddress
        onChange={(address) => {
          console.log({ address });
          setAddress(address);
        }}
      />
    </div>
  );
}
