export default function InputCheckbox({ label, helpText, id, ...rest }) {
  return (
    <div class="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          id={id}
          {...rest}
          className="h-4 w-4 rounded border-gray-300 text-blue-600"
        />
      </div>
      <div className="ml-3 text-sm">
        {!!label && <label for={id}>{label}</label>}
        {!!helpText && <p className="text-gray-500">{helpText}</p>}
      </div>
    </div>
  );
}
