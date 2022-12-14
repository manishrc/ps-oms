import { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { HiStar as StarIcon } from "react-icons/hi";
import {
  HiOutlineHeart as HeartIcon,
  HiOutlineMinus as MinusIcon,
  HiOutlinePlus as PlusIcon,
} from "react-icons/hi";
import ProductConfiguration from "@/components/product-configuration";
const HOST = process.env.VERCEL_URL;

const product = {
  name: "Hydro Flask® Standard Mouth With Flex Cap 21oz",
  price: "$25.90 Net",
  rating: 4,

  colors: [
    {
      name: "Black (BK)",
      bgColor: "bg-black",
      selectedColor: "ring-black",
    },
    {
      name: "Pacific (PFC)",
      bgColor: "bg-blue-500",
      selectedColor: "ring-blue-400",
    },
    {
      name: "Stone (ST)",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
    {
      name: "White (WH)",
      bgColor: "bg-white",
      selectedColor: "ring-gray-200",
    },
  ],
  description: `
    <p>Your perfect travel companion. Keep life moving with the Hydro Flask® Standard Mouth With Flex Cap 21oz. It stashes easily into a small shoulder bag, your pack’s side pocket, or your car cup holder, and holds enough ice-cold goodness to keep you going for hours without weighing you down. No wonder it's one of our bestselling water bottles. TempShield™ insulation eliminates condensation and keeps beverages cold up to 24 hours and hot up to 12 hours. BPA-Free. 21oz. Hand wash only.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ productData }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const images = [{ name: "Primary", src: productData.primaryImageUrl }];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {images.map((image) => (
                  <Tab
                    key={image.id}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only"> {image.name} </span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={image.src}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-blue-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {images.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {productData.productName}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              {/* <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p> */}
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: productData.description }}
              />
            </div>

            <form className="mt-6 hidden">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-600">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a color{" "}
                  </RadioGroup.Label>
                  <span className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedColor,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none",
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {" "}
                          {color.name}{" "}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.bgColor,
                            "h-8 w-8 border border-black border-opacity-10 rounded-full",
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </span>
                </RadioGroup>
              </div>

              <div className="sm:flex-col1 mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-8 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12 hidden">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {product.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-blue-600" : "text-gray-900",
                                "text-sm font-medium",
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-blue-400 group-hover:text-blue-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
            <section className="mt-12" aria-labelledby="product-configuration">
              <ProductConfiguration productData={productData} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { companyCode, productId } = context.params;
  console.log({ HOST });
  const res = await fetch(
    `https://ps-oms.vercel.app/api/ps/get-product/${companyCode}/${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  console.log({ res: res.body });
  const data = await res.json();
  const productData =
    data?.["Envelope"]?.["Body"]?.["GetProductResponse"]?.["Product"];

  return {
    props: { productData },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
