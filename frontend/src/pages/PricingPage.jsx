import React, { useEffect, useState } from 'react'
import PricingTier from '../components/PricingTier'
import { useAuth } from '../context/AuthContext' // Import useAuth
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const PricingPage = ({ onNavigate }) => { // Accept onNavigate
  const { user, loading: authLoading } = useAuth() // Get user state
  const [loadingPriceId, setLoadingPriceId] = useState(null) // Track loading state per button
  const [error, setError] = useState('')

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView', {
        page_path: window.location.pathname
      });
    }
  }, [])

  // --- Pricing Data ---
  const tiers = [
    {
      name: 'Free',
      price: '€0',
      description: 'Get started with core AI actions.',
      features: [
        { text: 'Text Assistant', included: true },
        { text: 'Code Assistant', included: true },
        { text: 'Academic Assistant', included: true },
        { text: 'Marketing/Social', included: true },
        { text: 'Context Menu Customization', included: false },
        { text: 'Smart Paste', included: false },
        { text: 'Smart Paste Customization', included: false },
        { text: 'Custom AI Prompts', included: false }
      ],
      usage: '5 Actions / Day',
      support: 'Community Forum',
      cta: 'Get Started'
    },
    {
      name: 'Basic',
      price: '€1.99',
      description: 'For regular users needing more flexibility.',
      features: [
        { text: 'Text Assistant', included: true },
        { text: 'Code Assistant', included: true },
        { text: 'Academic Assistant', included: true },
        { text: 'Marketing/Social', included: true },
        { text: 'Context Menu Customization', included: true },
        { text: 'Smart Paste', included: true },
        { text: 'Smart Paste Customization', included: false },
        { text: 'Custom AI Prompts', included: false }
      ],
      usage: '15 Actions / Day',
      support: 'Email Support',
      cta: 'Upgrade to Basic'
    },
    {
      name: 'Pro',
      price: '€3.99',
      isHighlighted: true,
      description: 'For power users & professionals.',
      features: [
        { text: 'Text Assistant', included: true },
        { text: 'Code Assistant', included: true },
        { text: 'Academic Assistant', included: true },
        { text: 'Marketing/Social', included: true },
        { text: 'Context Menu Customization', included: true },
        { text: 'Smart Paste', included: true },
        { text: 'Smart Paste Customization', included: true },
        { text: 'Custom AI Prompts', included: true }
      ],
      usage: 'Unlimited Actions',
      support: 'Priority Email Support',
      cta: 'Go Pro'
    }
  ]
  // --- End Pricing Data ---

  // --- FAQ Data ---
  const faqs = [
    {
      question: 'How does Smart Paste work?',
      answer: 'After selecting text, the user can use a keyboard shortcut to instantly transform it based on the intended action — for example, copying an email and generating a reply ( By default Smart Paste chooses either reply, summarize or create notes. Customizing this is exclusive to the Pro plan ).'
    },
    {
      question: 'What is the Context Menu?',
      answer: 'The context menu refers to the actions displayed when right clicking.'
    },
    {
      question: 'What is an "Action"?',
      answer: 'An Action refers to a single request made to the AI assistant, such as summarizing an article, converting code, or getting a response to a query.'
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time through the Stripe Billing Portal, accessible from your Profile page.'
    },
    {
      question: 'What happens if I exceed my Free plan action limit?',
      answer: 'Once you reach your daily action limit on the Free plan, you will need to wait until the next day for your actions to reset, or upgrade to a paid plan for more actions.'
    },
    {
      question: 'How do I customize the Context Menu and Smart Paste?',
      answer: 'Context Menu customization is available on Basic and Pro plans. Smart Paste customization is exclusive to the Pro plan. You can manage these options from your Profile page after subscribing to the appropriate plan.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, all payments are processed securely through Stripe, a leading online payment processor. We do not store your full payment card details on our servers.'
    }
  ]
  // --- End FAQ Data ---

  const handlePlanSelect = async (name, currentPlan) => {
    if (!user || !user.isLoggedIn) {
      // If user is not logged in, redirect to login
      onNavigate('login') // Use the navigation function
      return
    }

    setLoadingPriceId(name) // Set loading state for the clicked button
    setError('')
    if (currentPlan === 'free') {
      try {
        // 1. Call your backend to create a checkout session
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stripe/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ name })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create checkout session')
        }

        const { sessionId } = await response.json()

        // 2. Redirect to Stripe Checkout
        const stripe = await stripePromise
        const { error } = await stripe.redirectToCheckout({ sessionId })

        if (error) {
          console.error('Stripe redirect error:', error)
          setError(error.message)
        }
      } catch (err) {
        console.error(err)
        setError(err.message || 'Could not initiate checkout. Please try again.')
      } finally {
        setLoadingPriceId(null) // Reset loading state regardless of outcome
      }
    } else {
      try {
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
      }
    }
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-4'>
        Choose the Plan That's Right For You
      </h1>
      <p className='text-center text-gray-600 mb-12'>Simple plans, powerful features.</p>

      {error && (
        <div className='text-center mb-4 p-3 bg-red-100 text-red-700 rounded'>
          Error: {error}
        </div>
      )}

      {/* Pricing Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch'>
        {tiers.map((tier) => (
          // Pass handlePlanSelect to PricingTier or handle click here
          <div key={tier.name}> {/* Wrap PricingTier to handle click logic here */}
            <PricingTier
              tier={tier}
              isHighlighted={tier.isHighlighted}
              handlePlanSelect={handlePlanSelect}
              authLoading={authLoading}
              user={user}
              loadingPriceId={loadingPriceId}
            />
          </div>
        ))}
      </div>

      <div className='max-w-3xl mx-auto mt-20'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6'>
          {faqs.map((faq, index) => (
            <div key={index} className='border-b border-gray-200 pb-4'>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>{faq.question}</h3>
              <p className='text-gray-600'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default PricingPage
