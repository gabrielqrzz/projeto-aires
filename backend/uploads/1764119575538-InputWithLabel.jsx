const InputWithLabel = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={name}
        className="mb-1 text-sm font-semibold text-brand-red"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-2 py-2 border border-brand-red rounded-lg  "
      />
    </div>
  )
}

export default InputWithLabel
