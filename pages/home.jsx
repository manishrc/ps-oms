import { InputSelect, InputText } from "@/components/input";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleSubmit = (e) => {
    // Get data from form
    e.preventDefault();
    const formData = new FormData(e.target);
    const { productId, companyCode } = Object.fromEntries(formData);

    router.push(`/products/${companyCode}/${productId}`);
  };
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <form
        className="flex flex-col items-center p-10 max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Select a Product</h1>
        <div className="flex items-center mt-3">
          <InputSelect name="companyCode" endEdge>
            <option value="SanMar">SanMar</option>
            <option value="alphabroder">alphabroder</option>
            <option value="SS">SS</option>
            <option value="HIT">HIT</option>
            <option value="PCNA">PCNA</option>
          </InputSelect>
          <InputText
            name="productId"
            placeholder="Product Id"
            startEdge
            endEdge
            required
          />
          <button
            className="flex flex-1 rounded-r-md bg-blue-600 py-1.5 px-8 text-base font-medium text-white hover:bg-blue-700 border-blue-700 sm:w-full hover:text-white relative top-px mt-px"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
