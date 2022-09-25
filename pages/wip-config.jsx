import ColorSelect from "@/components/choose-color";
import ChooseShipping from "@/components/choose-shipping";
export default function ProductConfig({ productData }) {
  console.log(productData);
  return (
    <div>
      <ul>
        <li>Product details</li>
        <li>Product options (color, size)</li>
        <li>Quantity (price context, setup, run)</li>
        <li>Decoation (location, method)</li>
        <li>Artwork</li>
        <li>Shipping (to, from, carrier)</li>

        <ChooseShipping />
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch(
    `https://ps-oms.vercel.app/api/ps/get-product/$PCNA/1601-91`
  );
  const data = await res.json();
  const productData =
    data?.["Envelope"]?.["Body"]?.["GetProductResponse"]?.["Product"];

  return {
    props: { productData },
  };
}
