import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-gray-100 border-t border-gray-200 mt-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600'>
        <div className='flex justify-center space-x-6 mb-4'>
          <a href='privacy' className='hover:text-blue-500'>Privacy Policy</a>
          <a href='terms' className='hover:text-blue-500'>Terms of Service</a>
          <a href='contact' className='hover:text-blue-500'>Contact Us</a>
        </div>
        <p>&copy; {currentYear} Strompt. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
