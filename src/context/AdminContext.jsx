import React, { createContext, useContext, useState, useEffect } from 'react'
import { adminAPI } from '../services/api'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('adminToken'))

  useEffect(() => {
    if (token) {
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [token])

  const verifyToken = async () => {
    try {
      const response = await adminAPI.verify()
      setAdmin(response.data.admin)
    } catch (error) {
      localStorage.removeItem('adminToken')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await adminAPI.login(credentials)
      const { token: newToken, admin: adminData } = response.data
      
      localStorage.setItem('adminToken', newToken)
      setToken(newToken)
      setAdmin(adminData)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
    setAdmin(null)
  }

  const isAuthenticated = () => {
    return !!admin && !!token
  }

  return (
    <AdminContext.Provider value={{
      admin,
      loading,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}