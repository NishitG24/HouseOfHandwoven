import React from 'react'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/messaging'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="card" style={{ 
      overflow: 'hidden', 
      transition: 'all 0.3s ease',
      border: '1px solid #f0f0f0'
    }}>
      <div style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        borderRadius: '8px 8px 0 0',
        marginBottom: '16px'
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '100%', 
            height: '250px', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
        <button
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'white'
            e.target.style.transform = 'scale(1.1)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)'
            e.target.style.transform = 'scale(1)'
          }}
        >
          <Heart size={18} color="#ff6b6b" />
        </button>
      </div>

      <div style={{ padding: '0 8px 8px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#2c3e50',
          lineHeight: '1.3'
        }}>
          {product.name}
        </h3>
        
        <p style={{ 
          color: '#7f8c8d', 
          fontSize: '14px', 
          marginBottom: '12px',
          lineHeight: '1.4'
        }}>
          {product.description}
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#667eea'
          }}>
            {formatPrice(product.price)}
          </span>
          <span style={{
            background: '#f8f9fa',
            color: '#6c757d',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            textTransform: 'capitalize'
          }}>
            {product.category}
          </span>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          fontSize: '14px'
        }}>
          <span style={{ color: (product.quantity || 0) > 0 ? '#28a745' : '#dc3545', fontWeight: '500' }}>
            {(product.quantity || 0) > 0 ? `${product.quantity || 0} in stock` : 'Out of stock'}
          </span>
          <span style={{ color: (product.quantity || 0) > 0 ? '#28a745' : '#dc3545' }}>
            {(product.quantity || 0) > 0 ? '✓ Available' : '✗ Unavailable'}
          </span>
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={(product.quantity || 0) === 0}
          className="btn btn-primary"
          style={{ 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            opacity: (product.quantity || 0) === 0 ? 0.5 : 1,
            cursor: (product.quantity || 0) === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <ShoppingCart size={16} />
          {(product.quantity || 0) === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard