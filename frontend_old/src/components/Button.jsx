const Button = ({ text }) => {
    return (
      <button
        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  