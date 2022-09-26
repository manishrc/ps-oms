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
        <InputText name="name" label="Name / Attention" id="attentionTo" />
      </div>
      <div className="col-span-6">
        <InputText name="companyName" label="Company" id="companyName" />
      </div>
      <div className="col-span-6">
        <InputText name="address1" label="Address 1" id="address1" />
      </div>
      <div className="col-span-6">
        <InputText name="address2" label="Address 2" id="address2" />
      </div>
      <div className="col-span-6">
        <InputText name="city" label="City" id="city" />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText name="region" label="State / Region" id="region" />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputText
          name="postalCode"
          label="Zip / Postal Code"
          id="postalCode"
        />
      </div>
      <div className="col-span-6 sm:col-span-2">
        <InputSelectCountry name="country" label="Country" id="country" />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <InputText name="email" label="Email" id="email" type="email" />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <InputText name="phone" label="Phone" id="phone" />
      </div>
      <div>
        <button className="px-2 py-1 bg-blue-600 text-white">
          Save Address
        </button>
      </div>
    </form>
  );
}
