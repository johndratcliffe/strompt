import React from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import { ManagingSubscriptions } from '../components/ManagingSubscriptions'

const ProfilePage = ({ onNavigate }) => {
  const { user, loading: authLoading, logout } = useAuth()

  const currentPlan = user?.subscription?.plan
  const subscriptionStatus = user?.subscription?.status || 'inactive'

  if (authLoading) {
    return <div className='text-center py-10'>Loading profile...</div>
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl'>
      <h1 className='text-3xl font-bold mb-6'>Your Profile</h1>

      {/* Account Information Section */}
      <div className='bg-white shadow overflow-hidden sm:rounded-lg mb-8'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>Account Information</h3>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Full name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{user.name || 'Not Provided'}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Email address</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{user.email}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Current Plan</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold capitalize'>{currentPlan}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Subscription Status</dt>
              <dd className={`mt-1 text-sm sm:mt-0 sm:col-span-2 font-semibold capitalize ${subscriptionStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>{subscriptionStatus}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Manage Subscription Section */}
      <ManagingSubscriptions subscriptionStatus={subscriptionStatus} onNavigate={onNavigate} />

      {/* Feature Settings Section */}
      {/* Show this section if the user is Basic or Pro */}
      {(currentPlan === 'basic' || currentPlan === 'pro') && (
        <div className='bg-white shadow sm:rounded-lg mb-8'>
          <div className='px-4 py-5 sm:px-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Feature Settings</h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Configure specific features available with your plan.
            </p>
          </div>
          <div className='border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col space-y-4'>
            {/* Context Menu Button (Basic and Pro) */}
            <Button
              onClick={() => onNavigate('contextmenu')}
            >
              Change Context Menu
            </Button>

            {/* Smart Paste Button (Pro only) */}
            {currentPlan === 'pro' && (
              <Button
                onClick={() => onNavigate('smartpaste')}
              >
                Smart Paste Options
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className='mt-8 text-center'>
        <Button variant='secondary' onClick={logout}>Logout</Button>
      </div>

    </div>
  )
}

export default ProfilePage
