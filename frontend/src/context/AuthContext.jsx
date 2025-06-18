import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false })
  const [loading, setLoading] = useState(true)

  // Fetch user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, { method: 'GET', credentials: 'include' })
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          if (userData.isLoggedIn) {
            window.postMessage({
              type: 'LOGIN',
              setting: userData
            }, '*')
          }
        } else {
          setUser({ isLoggedIn: false })
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser({ isLoggedIn: false })
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const loginWithGoogle = () => {
    // Redirects to the backend endpoint which then redirects to Google
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`
  }

  const logout = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' })
      if (response.ok) {
        setUser({ isLoggedIn: false })
        window.postMessage({
          type: 'LOGOUT'
        }, '*')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const value = { user, setUser, loading, loginWithGoogle, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
