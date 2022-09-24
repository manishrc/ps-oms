import Head from "next/head";
import Image from "next/image";
import {
  InputCheckbox,
  InputText,
  InputSelect,
  InputDate,
} from "@/components/input";
import { HiArchive } from "react-icons/hi";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Next.js Base Template</title>
        <meta name="description" content="Next.js Base Template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className="max-w-lg mx-auto p-3 space-y-3">
        <InputText
          label="Order Type"
          id="orderType"
          name="orderType"
          value="Configured"
        />
        <InputText label="Order Number" id="orderNumber" name="orderNumber" />
        <InputDate label="Order Date" id="orderDate" name="orderDate" />
        <InputText
          label="Total"
          type="number"
          id="totalAmount"
          name="totalAmount"
          step="0.01"
        />
        <InputCheckbox label="Rush" id="isRush" />
        <InputSelect label="Currency" id="currency">
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </InputSelect>

        <div className="hidden">
          <InputText
            label="Terms and Conditions"
            id="termsAndConditions"
            name="termsAndConditions"
            value="N/A"
          />
        </div>
        <LineItemArray />
      </form>
    </div>
  );
}

function LineItemArray() {
  return (
    <>
      <InputText
        label="Line Number"
        id="lineNumber"
        name="lineNumber"
        readOnly
      />
      <InputText label="Line Type" id="lineType" name="lineType" readOnly />

      <div>
        <label for="line[0].quantity.value">Quantity</label>
        <div className="flex">
          <InputText
            id="line[0].quantity.value"
            name="line[0].quantity.value"
            endEdge
          />
          <InputSelect
            id="line[0].quantity.uom"
            name="line[0].quantity.uom"
            defaultValue="EA"
            startEdge
          >
            <option value="BX">Box</option>
            <option value="CA">Case</option>
            <option value="DZ">Dozen</option>
            <option value="EA">Each</option>
            <option value="KT">Kit</option>
            <option value="PR">Pair</option>
            <option value="PK">Package</option>
            <option value="RL">Roll</option>
            <option value="ST">Set</option>
            <option value="SL">Sleeve</option>
            <option value="TH">Thousand</option>
          </InputSelect>
        </div>
      </div>
      {/* Advanced */}
      <div>
        <InputSelect
          label="Tolerance Details"
          id="toleranceDetails"
          name="toleranceDetails"
          defaultValue="ExactOnly"
        >
          <option value="AllowOverRun">Allow Over Run</option>
          <option value="AllowUnderrun">Allow Underrun</option>
          <option value="AllowOverrunOrUnderrun">
            Allow Overrun Or Underrun
          </option>
          <option value="ExactOnly">Exact Only</option>
        </InputSelect>
      </div>

      <InputCheckbox
        label="Allow Partial Shipments"
        id="allowPartialShipments"
        name="allowPartialShipments"
      />

      <InputText
        label="Line Item Total"
        id="lineItemTotal"
        name="lineItemTotal"
        type="number"
      />
    </>
  );
}
