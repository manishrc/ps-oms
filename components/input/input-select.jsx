import classNames from "@/lib/classnames";

export default function InputSelect({
  label,
  id,
  children,
  startEdge,
  endEdge,
  startIcon,
  endIcon,
  ...rest
}) {
  return (
    <div>
      {!!label && (
        <label className="font-medium text-gray-700" for={id}>
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
        <select
          id={id}
          className={classNames(
            "block w-full rounded-md border-gray-300 shadow-sm sm:text-sm",
            startEdge ? "rounded-l-none" : "",
            endEdge ? "rounded-r-none" : "",
            startIcon ? "pl-10" : "",
            endIcon ? "pr-10" : ""
          )}
          {...rest}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
