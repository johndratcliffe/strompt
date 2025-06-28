import React from 'react'
import Button from './Button'
import { useAuth } from '../context/AuthContext'
import Logo from '../assets/icon.png'

const Header = ({ onNavigate }) => {
  const { user, logout, loading } = useAuth()

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <img className='w-10 h-10' src={Logo} alt='Logo' />
          <div className='text-2xl font-bold cursor-pointer' onClick={() => onNavigate('home')}>
            Strompt
          </div>
        </div>
        <div className='hidden lg:flex items-center space-x-6'>
          <a href='#how_it_works' className='text-gray-600 hover:text-blue-500' onClick={(e) => { e.preventDefault(); onNavigate('home', 'how_it_works') }}>How it Works</a>
          <a href='#features' className='text-gray-600 hover:text-blue-500' onClick={(e) => { e.preventDefault(); onNavigate('home', 'features') }}>Features</a>
          <a href='/pricing' className='text-gray-600 hover:text-blue-500' onClick={(e) => { e.preventDefault(); onNavigate('pricing') }}>Pricing</a>
          <a href='/examples' className='text-gray-600 hover:text-blue-500' onClick={(e) => { e.preventDefault(); onNavigate('examples') }}>Examples</a>
        </div>
        <div className='flex items-center space-x-4'>
          {loading
            ? (
              <div className='text-sm text-gray-500'>Loading...</div>
              )
            : user.isLoggedIn
              ? (
                <>
                  <span className='text-sm text-gray-700 hidden sm:inline'>Welcome, {user.name || user.email}!</span>
                  <Button variant='outline' size='sm' onClick={() => onNavigate('profile')}>Profile</Button>
                  <Button variant='secondary' size='sm' onClick={logout}>Logout</Button>
                </>
                )
              : (
                <>
                  <Button variant='secondary' onClick={() => onNavigate('login')}>Login</Button>
                  <Button variant='primary' onClick={() => window.location.href = import.meta.env.VITE_CHROME_STORE_URL}>Install Free</Button>
                </>
                )}
        </div>
      </nav>
    </header>
  )
}

export default Header
