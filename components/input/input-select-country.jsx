import InputSelect from "./input-select";

// @TODO - Use i18n-iso-countries to generate the list of countries
// https://www.npmjs.com/package/i18n-iso-countries

export default function InputSelectCountry({ ...rest }) {
  return (
    <InputSelect {...rest}>
      <option value="US">United States</option>
      <option value="CA">Canada</option>
    </InputSelect>
  );
}
