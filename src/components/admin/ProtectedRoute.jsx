import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f8f9fa'
      }}>
        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6c757d' }}>Verifying authentication...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute