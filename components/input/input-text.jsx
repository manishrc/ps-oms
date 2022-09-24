export default function InputText({ label, id, type = "text", edge, ...rest }) {
  return (
    <div>
      {!!label && (
        <label for={id} className="font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          type={type}
          id={id}
          className={`block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
            edge == "left" ? "rounded-r-none" : ""
          } ${edge == "right" ? "rounded-l-none" : ""}`}
          {...rest}
        />
      </div>
    </div>
  );
}
