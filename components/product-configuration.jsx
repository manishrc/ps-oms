import { useRouter } from "next/router";
import { useState } from "react";
import ChoosePart from "@/components/choose-part";
import ChooseDecorationLocation from "@/components/choose-decoration-location";
import ChooseDecorationMethod from "@/components/choose-decoration-method";
import ChooseArtwork from "@/components/choose-artwork";
import { InputAddress } from "@/components/input";
import ChooseShipping from "@/components/choose-shipping";
import EditAddress from "@/components/edit-address";
import ChooseQuantity from "@/components/choose-quantity";

export default function ProductConfiguration({ productData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [partId, setPartId] = useState();
  const [decorationLocation, setDecorationLocation] = useState();
  const [decorationMethod, setDecorationMethod] = useState();
  const [artworkFile, setArtworkFile] = useState();
  const [address, setAddress] = useState();
  const [shippingMethod, setShippingMethod] = useState();
  const { query } = useRouter();

  const submitPO = () => {
    const poRequestBody = {
      orderType: "Simple",
      orderNumber: `PHO-${Math.floor(Math.random() * 100000)}`,
      orderDate: new Date().toISOString(),
      totalAmount: "20",
      rush: false,
      currency: "USD",
      shipments: [
        {
          customerPickup: false,
          shipTo: {
            shipmentId: `PHS-${Math.floor(Math.random() * 100000)}`,
            ...address,
          },
          packingListRequired: false,
          blindShip: false,
          allowConsolidation: true,
          freightDetails: {
            carrier: shippingMethod.carrier,
            service: shippingMethod.serviceCode,
          },
        },
      ],
      lineItems: [
        {
          lineNumber: 1,
          description: "NA",
          lineType: "New",
          lineItemTotal: 20.2,
          quantity: {
            value: 1,
            uom: "EA",
          },
          toleranceDetails: {
            tolerance: "ExactOnly",
          },
          allowPartialShipments: false,
          parts: [
            {
              partId,
              customerSupplied: false,
              quantity: {
                value: 1,
                uom: "EA",
              },
            },
          ],
          // configuration: {
          //   locations: [
          //     {
          //       locationLinkId: `PHLL-${Math.floor(Math.random() * 100000)}`,
          //       locationId: decorationLocation.locationId,
          //       locationName: decorationLocation.locationName,
          //       DecorationArray: [
          //         {
          //           decorationId: "",
          //           decorationName: decorationMethod.decorationName,
          //           artWork: {
          //             artworkFiles: [
          //               {
          //                 fileName: artworkFile.name,
          //                 fileLocation: artworkFile.url,
          //                 transportMechanism: "Url",
          //                 artworkType: "ProductionReady",
          //               },
          //             ],
          //           },
          //         },
          //       ],
          //     },
          //   ],
          // },
        },
      ],
      termsAndConditions: "Pricing per AIM",
    };
    console.log({
      poRequestBody,
    });
    fetch(`/api/ps/po/${encodeURIComponent(query.companyCode)}`, {
      method: "POST",
      body: JSON.stringify(poRequestBody),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const downloadPO = () => {
    const poRequestBody = {
      orderType: "Simple",
      orderNumber: `PHO-${Math.floor(Math.random() * 100000)}`,
      orderDate: new Date().toISOString(),
      totalAmount: "20",
      rush: false,
      currency: "USD",
      shipments: [
        {
          customerPickup: false,
          shipTo: {
            shipmentId: `PHS-${Math.floor(Math.random() * 100000)}`,
            ...address,
          },
          packingListRequired: false,
          blindShip: false,
          allowConsolidation: true,
          freightDetails: {
            carrier: shippingMethod.carrier,
            service: shippingMethod.serviceCode,
          },
        },
      ],
      lineItems: [
        {
          lineNumber: 1,
          description: "NA",
          lineType: "New",
          lineItemTotal: 20.2,
          quantity: {
            value: 1,
            uom: "EA",
          },
          toleranceDetails: {
            tolerance: "ExactOnly",
          },
          allowPartialShipments: false,
          parts: [
            {
              partId,
              customerSupplied: false,
              quantity: {
                value: 1,
                uom: "EA",
              },
            },
          ],
          // configuration: {
          //   locations: [
          //     {
          //       locationLinkId: `PHLL-${Math.floor(Math.random() * 100000)}`,
          //       locationId: decorationLocation.locationId,
          //       locationName: decorationLocation.locationName,
          //       DecorationArray: [
          //         {
          //           decorationId: "",
          //           decorationName: decorationMethod.decorationName,
          //           artWork: {
          //             artworkFiles: [
          //               {
          //                 fileName: artworkFile.name,
          //                 fileLocation: artworkFile.url,
          //                 transportMechanism: "Url",
          //                 artworkType: "ProductionReady",
          //               },
          //             ],
          //           },
          //         },
          //       ],
          //     },
          //   ],
          // },
        },
      ],
      termsAndConditions: "Pricing per AIM",
    };
    console.log({
      poRequestBody,
    });
    fetch(`/api/ps/po/${encodeURIComponent(query.companyCode)}/download`, {
      method: "POST",
      body: JSON.stringify(poRequestBody),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.text();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="space-y-12">
      <ChoosePart
        productData={productData}
        onChange={(partId) => {
          console.log("partId", partId);
          setPartId(partId);
        }}
      />
      <ChooseQuantity
        productId={query.productId}
        companyCode={query.companyCode}
        partId={partId}
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
      <EditAddress
        onChange={(address) => {
          console.log({ address });
          setAddress(address);
        }}
      />
      {address && (
        <ChooseShipping
          shipToAddress={address}
          onChange={(shippingMethod) => {
            console.log("shippingMethod", shippingMethod);
            setShippingMethod(shippingMethod);
          }}
        />
      )}
      <button onClick={submitPO}>Submit PO</button>
      <button onClick={downloadPO}>Download</button>
    </div>
  );
}
