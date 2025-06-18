import React from 'react'

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center'>
      <div className='text-blue-500 mb-4'>{icon}</div>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}

export default FeatureCard
