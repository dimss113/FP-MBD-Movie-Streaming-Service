export const Message = ({ label, placeholder }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className="w-full h-40 mt-2 p-6 border bg-main border-border rounded"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export const Select = ({ label, options, onChange }) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
        onChange={onChange}
      >
        {options.map((o, index) => (
          <option key={index} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </>
  );
};

export const Input = ({ label, value, placeholder, type, bg, onChange }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-4 border border-border rounded text-white ${
          bg ? "bg-main" : "bg-dray"
        }`}
      />
    </div>
  );
};
