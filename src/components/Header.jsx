import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header style={{ 
      background: 'white', 
      boxShadow: '0 2px 10px rgba(15, 76, 117, 0.1)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000 
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 20px' 
      }}>
        <Link to="/" style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#0F4C75', 
          textDecoration: 'none' 
        }}>
          HandWoven Jewels
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ 
          display: 'flex', 
          gap: '32px', 
          alignItems: 'center' 
        }} className="desktop-nav">
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/') ? '#3282B8' : '#0F4C75',
              fontWeight: isActive('/') ? '600' : '400',
              transition: 'color 0.3s ease'
            }}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/products') ? '#3282B8' : '#0F4C75',
              fontWeight: isActive('/products') ? '600' : '400',
              transition: 'color 0.3s ease'
            }}
          >
            Products
          </Link>
          <Link 
            to="/contact" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/contact') ? '#3282B8' : '#0F4C75',
              fontWeight: isActive('/contact') ? '600' : '400',
              transition: 'color 0.3s ease'
            }}
          >
            Contact
          </Link>
          <Link 
            to="/cart" 
            style={{ 
              position: 'relative', 
              color: '#0F4C75', 
              textDecoration: 'none' 
            }}
          >
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#3282B8',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {getTotalItems()}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            color: '#0F4C75'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav style={{ 
          background: 'white', 
          borderTop: '1px solid #BBE1FA', 
          padding: '20px' 
        }} className="mobile-nav">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/') ? '#3282B8' : '#0F4C75',
                fontWeight: isActive('/') ? '600' : '400'
              }}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/products') ? '#3282B8' : '#0F4C75',
                fontWeight: isActive('/products') ? '600' : '400'
              }}
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/contact') ? '#3282B8' : '#0F4C75',
                fontWeight: isActive('/contact') ? '600' : '400'
              }}
            >
              Contact
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                textDecoration: 'none', 
                color: '#0F4C75' 
              }}
            >
              <ShoppingCart size={20} />
              Cart ({getTotalItems()})
            </Link>
          </div>
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}

export default Header