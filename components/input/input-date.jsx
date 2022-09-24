export default function InputDate({ label, id, type = "date", ...rest }) {
  return (
    <div>
      {!!label && (
        <label for={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          type={type}
          id={id}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          {...rest}
        />
      </div>
    </div>
  );
}
