import { InputText, InputSelectCountry } from "@/components/input";

export default function InputAddress({ onChange, defaultValue }) {
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
          required
          defaultValue={defaultValue?.name}
        />
      </div>
      <div className="col-span-6">
        <InputText
          name="companyName"
          label="Company"
          id="companyName"
          placeholder="ACME Inc."
          defaultValue={defaultValue?.companyName}
        />
      </div>
      <div className="col-span-6">
        <InputText
          name="address1"
          label="Address 1"
          id="address1"
          placeholder="212 5th Ave"
          required
          defaultValue={defaultValue?.address1}
        />
      </div>
      <div className="col-span-6">
        <InputText
          name="address2"
          label="Address 2"
          id="address2"
          placeholder="Suite #429"
          defaultValue={defaultValue?.address2}
        />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText
          name="city"
          label="City"
          id="city"
          placeholder="New York"
          required
          defaultValue={defaultValue?.city}
        />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText
          name="region"
          label="State / Region"
          id="region"
          placeholder="NY"
          required
          defaultValue={defaultValue?.region}
        />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText
          name="postalCode"
          label="Zip / Postal Code"
          id="postalCode"
          placeholder="10010"
          required
          defaultValue={defaultValue?.postalCode}
        />
      </div>
      <div className="col-span-6">
        <InputSelectCountry
          name="country"
          label="Country"
          id="country"
          required
          defaultValue={defaultValue?.country}
        />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputText
          name="email"
          label="Email"
          id="email"
          type="email"
          placeholder="john@gmail.com"
          defaultValue={defaultValue?.email}
        />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <InputText
          name="phone"
          label="Phone"
          id="phone"
          placeholder="+1 201 500 7777"
          defaultValue={defaultValue?.phone}
        />
      </div>
      <div className="col-span-6 sm:col-span-6 mt-6">
        <button className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm">
          Save Address
        </button>
      </div>
    </form>
  );
}
