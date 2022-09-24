export default function InputSelect({ label, id, children, edge, ...rest }) {
  return (
    <div>
      {!!label && <label for={id}>{label}</label>}
      <div className="mt-1">
        <select
          id={id}
          className={`block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
            edge == "left" ? "rounded-r-none" : ""
          } ${edge == "right" ? "rounded-l-none" : ""}`}
          {...rest}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
