export default function ProductConfig({ productData }) {
  return (
    <div>
      <ul>
        <li>Product details</li>
        <li>Product color</li>
        <li>Quantity (price context)</li>g<li>Artwork</li>
        <li>Shipping</li>
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
