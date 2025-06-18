const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
  const baseStyle = 'px-6 py-3 rounded-md font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'
  let variantStyle = ''

  switch (variant) {
    case 'primary':
      variantStyle = 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
      break
    case 'secondary':
      variantStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400'
      break
    case 'accent': // For highlighted Pro button maybe
      variantStyle = 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500'
      break
    case 'outline':
      variantStyle = 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500'
      break
    default:
      variantStyle = 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
