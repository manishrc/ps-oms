import { InputText, InputSelectCountry } from "@/components/input";

export default function InputAddress({ onChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let address = {};
    new FormData(e.target).forEach((value, key) => {
      address[key] = value;
    });
    onChange?.(address);
  };

  return (
    <form className="grid grid-cols-6 gap-3" onSubmit={handleSubmit}>
      <div className="col-span-6">
        <InputText
          name="name"
          label="Name / Attention"
          id="attentionTo"
          placeholder="John Doe"
        />
      </div>
      <div className="col-span-6">
        <InputText
          name="companyName"
          label="Company"
          id="companyName"
          placeholder="ACME Inc."
        />
      </div>
      <div className="col-span-6">
        <InputText
          name="address1"
          label="Address 1"
          id="address1"
          placeholder="212 5th Ave"
        />
      </div>
      <div className="col-span-6">
        <InputText
          name="address2"
          label="Address 2"
          id="address2"
          placeholder="Suite #429"
        />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText name="city" label="City" id="city" placeholder="New York" />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText
          name="region"
          label="State / Region"
          id="region"
          placeholder="NY"
        />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText
          name="postalCode"
          label="Zip / Postal Code"
          id="postalCode"
          placeholder="10010"
        />
      </div>
      <div className="col-span-6">
        <InputSelectCountry name="country" label="Country" id="country" />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputText
          name="email"
          label="Email"
          id="email"
          type="email"
          placeholder="john@gmail.com"
        />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputText
          name="phone"
          label="Phone"
          id="phone"
          placeholder="+1 201 500 7777"
        />
      </div>
      <div className="col-span-6 sm:col-span-6 mt-6">
        <button className="flex w-full flex-1 items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-8 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
          Save Address
        </button>
      </div>
    </form>
  );
}
