import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CustomizeContextMenu } from './components/CustomizeContextMenu.jsx'
import { CustomizeSmartPaste } from './components/CustomizeSmartPaste.jsx'
import { Examples } from './pages/Examples.jsx'
import { Animation } from './components/Animation.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import TermsOfServicePage from './pages/TermsOfServicePage.jsx'
import ContactUsPage from './pages/ContactPage.jsx'

// Component to handle routing based on Auth state
function AppContent () {
  const [currentPage, setCurrentPage] = useState(getPageFromUrl()) // Simple routing based on URL path
  const { user, loading } = useAuth()

  useEffect(() => {
    // Update page based on URL changes (basic example)
    const handlePopState = () => setCurrentPage(getPageFromUrl())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function getPageFromUrl () {
    const path = window.location.pathname
    if (path === '/pricing') return 'pricing'
    if (path === '/login') return 'login'
    if (path === '/profile') return 'profile'
    if (path === '/contextmenu') return 'contextmenu'
    if (path === '/smartpaste') return 'smartpaste'
    if (path === '/examples') return 'examples'
    if (path === '/privacy') return 'privacy'
    if (path === '/terms') return 'terms'
    if (path === '/contact') return 'contact'
    if (path === '/animation') return 'animation'
    return 'home' // Default
  }

  // Simple navigation function (replace with React Router if needed)
  const navigateTo = (page, sectionId = null) => {
    const newPath = page === 'home' ? '/' : `/${page}`
    window.history.pushState({}, '', newPath) // Update URL without reload
    setCurrentPage(page) // Update state

    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle protected routes
  useEffect(() => {
    if (!loading && !user.isLoggedIn && currentPage === 'profile') {
      navigateTo('login') // Redirect to login if not authenticated and trying to access profile
    }
    if (!loading && !user.isLoggedIn && currentPage === 'contextmenu') {
      navigateTo('login') // Redirect to login if not authenticated and trying to access contextmenu
    }
    if (!loading && !user.isLoggedIn && currentPage === 'smartpaste') {
      navigateTo('login') // Redirect to login if not authenticated and trying to access smartpaste
    }
    if (!loading && user.isLoggedIn && currentPage === 'login') {
      navigateTo('profile') // Redirect to profile if authenticated and trying to access login
    }
  }, [user, loading, currentPage]) // Add navigateTo to dependency array if it uses state/props

  if (loading) {
    // Optional: Show a global loading spinner
    return <div className='flex justify-center items-center min-h-screen'>Loading...</div>
  }

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <Header onNavigate={navigateTo} />
      <main className='flex-grow'>
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'pricing' && <PricingPage onNavigate={navigateTo} />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'profile' && <ProfilePage onNavigate={navigateTo} />}
        {currentPage === 'contextmenu' && <CustomizeContextMenu onNavigate={navigateTo} />}
        {currentPage === 'smartpaste' && <CustomizeSmartPaste onNavigate={navigateTo} />}
        {currentPage === 'examples' && <Examples />}
        {currentPage === 'privacy' && <PrivacyPolicyPage onNavigate={navigateTo} />}
        {currentPage === 'terms' && <TermsOfServicePage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactUsPage onNavigate={navigateTo} />}
        {currentPage === 'animation' && <Animation />}
      </main>
      {currentPage !== 'contextmenu' && currentPage !== 'smartpaste' && <Footer />}
    </div>
  )
}

// Wrap the AppContent with AuthProvider
function App () {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
