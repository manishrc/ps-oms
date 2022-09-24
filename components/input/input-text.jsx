export default function InputText({
  label,
  id,
  type = "text",
  startEdge,
  endEdge,
  startIcon,
  endIcon,
  ...rest
}) {
  return (
    <div>
      {!!label && (
        <label for={id} className="font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative mt-1">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {startIcon}
          </div>
        )}
        {endIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </div>
        )}
        <input
          type={type}
          id={id}
          className={`block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
            startEdge ? "rounded-l-none" : ""
          } ${endEdge ? "rounded-r-none" : ""} ${startIcon ? "pl-10" : ""} ${
            endIcon ? "pr-10" : ""
          }`}
          {...rest}
        />
      </div>
    </div>
  );
}
