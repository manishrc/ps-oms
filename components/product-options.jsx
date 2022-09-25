export default function ProductOptions({ productData }) {
  const { sizes, colors } = productData?.["Envelope"]?.[
    "Body"
  ].GetProductResponse?.Product?.ProductPartArray.reduce(
    (prev, curr) => {
      const size = curr.ApparelSize?.labelSize;
      const color = curr.ColorArray?.map((c) => c.colorName).join(" / ");
      return {
        sizes: size ? prev.sizes.add(size) : prev.sizes,
        colors: color ? prev.colors.add(color) : prev.colors,
      };
    },
    { sizes: new Set(), colors: new Set() },
  );

  return (
    <>
      {sizes.size > 0 && (
        <fieldset id="sizes">
          <legend>Sizes</legend>
          {[...sizes].map((size) => (
            <label key={size}>
              <input type="radio" name="size" value={size} />
              {size}
            </label>
          ))}
        </fieldset>
      )}
      {colors.size > 0 && (
        <fieldset id="colors">
          <legend>Colors</legend>
          {[...colors].map((color) => (
            <label key={color}>
              <input type="radio" name="color" value={color} />
              {color}
            </label>
          ))}
        </fieldset>
      )}
    </>
  );
}
