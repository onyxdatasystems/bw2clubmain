const InputField = ({ label, type, placeholder }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
    );
  };
  
  export default InputField;
  