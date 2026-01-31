import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Star, BarChart3, Plus, Settings, LogOut, Calendar } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { adminAPI } from '../../services/api'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { admin, logout } = useAdmin()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await adminAPI.getDashboard()
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div>Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '16px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '24px', color: '#2c3e50' }}>
            Admin Dashboard
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#7f8c8d' }}>
              Welcome, {admin?.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '32px 20px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div className="card" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Package size={32} />
              <div>
                <h3 style={{ fontSize: '32px', marginBottom: '4px' }}>
                  {stats?.totalProducts || 0}
                </h3>
                <p style={{ opacity: 0.9 }}>Total Products</p>
              </div>
            </div>
          </div>

          <div className="card" style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Star size={32} />
              <div>
                <h3 style={{ fontSize: '32px', marginBottom: '4px' }}>
                  {stats?.featuredProducts || 0}
                </h3>
                <p style={{ opacity: 0.9 }}>Featured Products</p>
              </div>
            </div>
          </div>

          <div className="card" style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <BarChart3 size={32} />
              <div>
                <h3 style={{ fontSize: '32px', marginBottom: '4px' }}>
                  {stats?.categories?.length || 0}
                </h3>
                <p style={{ opacity: 0.9 }}>Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '24px', color: '#2c3e50' }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <Link
              to="/admin/products/new"
              style={{
                background: '#28a745',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Plus size={20} />
              Add New Product
            </Link>

            <Link
              to="/admin/products"
              style={{
                background: '#0F4C75',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Package size={20} />
              Manage Products
            </Link>

            <Link
              to="/admin/events"
              style={{
                background: '#3282B8',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Calendar size={20} />
              Manage Events
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#17a2b8',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Settings size={20} />
              View Website
            </a>
          </div>
        </div>

        {/* Categories Breakdown */}
        {stats?.categories && stats.categories.length > 0 && (
          <div className="card">
            <h2 style={{ fontSize: '20px', marginBottom: '24px', color: '#2c3e50' }}>
              Products by Category
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px'
            }}>
              {stats.categories.map((category) => (
                <div
                  key={category._id}
                  style={{
                    background: '#f8f9fa',
                    padding: '16px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}
                >
                  <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '4px' }}>
                    {category.count}
                  </h3>
                  <p style={{ 
                    color: '#6c757d', 
                    textTransform: 'capitalize',
                    fontSize: '14px'
                  }}>
                    {category._id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard