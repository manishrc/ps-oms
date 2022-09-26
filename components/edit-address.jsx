import { Fragment, useState } from "react";
import { InputAddress } from "@/components/input";
import { Dialog, Transition } from "@headlessui/react";

// import { CheckIcon } from '@heroicons/react/24/outline'

export default function EditAddress({ onChange }) {
  const [address, setAddress] = useState();
  const [open, setOpen] = useState(false);

  const handleAddressChange = (address) => {
    setAddress(address);
    setOpen(false);
    console.log({ address });
    onChange?.(address);
  };
  // Empty State
  // Filled State
  // Edit Modal

  return (
    <div>
      <span className="font-medium text-gray-700 text-base">
        Shipping Address
      </span>
      <div>
        {address && (
          // <InputAddress onChange={handleAddressChange} />
          <AddressSnippet address={address} />
        )}
        {address ? (
          <button
            className="text-sm text-blue-600 pt-2"
            onClick={() => setOpen(true)}
          >
            Edit Address
          </button>
        ) : (
          <button
            className="mt-3 flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-8 text-base font-medium text-gray-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full hover:text-white hover:border-transparent"
            type="button"
            onClick={() => setOpen(true)}
          >
            Add Address
          </button>
        )}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                    <div>
                      <InputAddress
                        onChange={handleAddressChange}
                        defaultValue={address}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}

function AddressSnippet({ address }) {
  return (
    <div className="text-gray-900 text-lg mt-3 space-y-2">
      <div className="">
        {address.name && <div className="font-medium">{address.name}</div>}
        {address.companyName && <div>{address.companyName}</div>}
        {address.address1 && <div>{address.address1}</div>}
        <div>
          {address.city && <span>{address.city}</span>}{" "}
          {address.region && <span>{address.region}</span>}{" "}
          {address.postalCode && <span>{address.postalCode}</span>}
        </div>
      </div>
      <div className="text-base">
        {address.email && <div>{address.email}</div>}
        {address.phone && <div>{address.phone}</div>}
      </div>
    </div>
  );
}
