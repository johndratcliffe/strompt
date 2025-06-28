import React from 'react'
import Button from './Button'

const CheckIcon = () => (
  <svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' fill='none' />
  </svg>
)

const CrossIcon = () => (
  <svg className='w-5 h-5 text-red-400 mr-2 flex-shrink-0' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
  </svg>
)

const PricingTier = ({ tier, isHighlighted = false, handlePlanSelect, authLoading, user, loadingPriceId }) => {
  return (
    <div className={`border rounded-lg p-6 flex flex-col ${isHighlighted ? 'border-blue-500 border-2 shadow-xl relative' : 'border-gray-300 bg-white'}`}>
      {isHighlighted && (
        <span className='bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2'>
          Most Popular
        </span>
      )}
      <h3 className='text-2xl font-bold text-center mb-4'>{tier.name}</h3>
      <div className='text-center mb-4'>
        <span className='text-4xl font-bold'>{tier.price}</span>
        <span className='text-gray-500'>/ month</span>
      </div>
      <p className='text-gray-600 text-center mb-6 h-12'>{tier.description}</p>

      <ul className='space-y-3 mb-8 flex-grow'>
        {tier.features.map((feature, index) => (
          <li key={index} className='flex items-start'>
            {feature.included ? <CheckIcon /> : <CrossIcon />}
            <span>{feature.text}</span>
          </li>
        ))}
        {tier.usage && (
          <li className='flex items-start'>
            <CheckIcon />
            <span>{tier.usage}</span>
          </li>
        )}
        {tier.support && (
          <li className='flex items-start'>
            <CheckIcon />
            <span>{tier.support}</span>
          </li>
        )}
      </ul>

      {tier.name !== 'Free' && ( // Only show checkout button for paid plans
        <Button
          variant={tier.isHighlighted ? 'primary' : 'outline'}
          className='w-full mt-4' // Adjust styling if needed
          onClick={() => handlePlanSelect(tier.name, user.subscription?.plan)}
          disabled={authLoading || loadingPriceId === tier.priceId || (user && user?.subscription?.plan === tier.name.toLowerCase())}
        >
          {loadingPriceId === tier.priceId
            ? 'Processing...'
            : (user.subscription?.plan === 'pro' && tier.name.toLowerCase() === 'basic'
                ? 'Change plan'
                : user.subscription?.plan === 'basic' && tier.name.toLowerCase() === 'pro'
                  ? ' Upgrade'
                  : user.subscription?.plan === tier.name.toLowerCase()
                    ? 'Current Plan'
                    : tier.cta)}
        </Button>
      )}
      {tier.name === 'Free' && (
        <Button
          variant='outline'
          className='w-full mt-4'
          onClick={() => window.location.href = import.meta.env.VITE_CHROME_STORE_URL}
        >
          {tier.cta}
        </Button>
      )}
    </div>
  )
}

export default PricingTier
