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
        return response.text();
      })
      .then(function (text) {
        console.log(text);
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/xml;charset=utf-8," + encodeURIComponent(text),
        );
        element.setAttribute("download", poRequestBody.orderNumber + ".xml");
        element.style.display = "none";

        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
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
      <div>
        <button
          className="mt-3 flex w-full flex-1 items-center justify-center rounded-md border border-blue-700 bg-blue-600 py-3 px-8 text-base font-medium text-white  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full hover:text-white hover:border-transparent"
          onClick={submitPO}
        >
          Submit PO
        </button>
        <button
          className="mt-3 flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-8 text-base font-medium text-gray-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full hover:text-white hover:border-transparent"
          onClick={downloadPO}
        >
          Download e-PO for Email
        </button>
      </div>
    </div>
  );
}
