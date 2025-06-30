import { useState } from 'react'
import Button from './Button'

export const ManagingSubscriptions = ({ subscriptionStatus, onNavigate }) => {
  const [managingSubscription, setManagingSubscription] = useState(false)
  const [error, setError] = useState('')

  const handleManageSubscription = async () => {
    setManagingSubscription(true)
    setError('')
    try {
    // 1. Call your backend to create a portal session
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stripe/create-portal-session`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const { url } = await response.json()

      // 2. Redirect user to the Stripe Billing Portal
      window.location.href = url
    } catch (err) {
      console.error(err)
      setError('Could not manage subscription. Please try again.')
      setManagingSubscription(false)
    }
  }

  return (
    <div className='bg-white shadow sm:rounded-lg mb-8'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>Manage Subscription</h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Update your billing details, change plans, or cancel your subscription via the Stripe Billing Portal.
        </p>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
        {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}
        <Button
          onClick={handleManageSubscription}
          disabled={managingSubscription || subscriptionStatus === 'inactive'} // Disable if free user or already processing
          className={subscriptionStatus === 'inactive' ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {managingSubscription ? 'Redirecting...' : 'Manage Billing & Subscription'}
        </Button>
        {subscriptionStatus === 'inactive' && (
          <p className='text-sm text-gray-500 mt-2'>Upgrade your plan from the<span> </span>
            <a
              href='/pricing' className='text-blue-600 hover:underline' onClick={(e) => {
                e.preventDefault() // Prevent default link behavior
                onNavigate('pricing') // Use the new navigation handler
              }}
            >Pricing Page
            </a>.
          </p>
        )}
      </div>
    </div>
  )
}
