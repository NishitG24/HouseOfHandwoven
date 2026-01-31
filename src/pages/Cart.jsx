import React, { useState } from 'react'
import { Trash2, Plus, Minus, MessageCircle, Instagram, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { sendWhatsAppMessage, sendInstagramMessage, formatPrice } from '../utils/messaging'

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
  }

  const validateForm = () => {
    return customerInfo.name && customerInfo.phone && customerInfo.email && customerInfo.address
  }

  const handleWhatsAppOrder = () => {
    if (!validateForm()) {
      alert('Please fill in all customer information fields')
      return
    }
    sendWhatsAppMessage(items, customerInfo)
    clearCart()
    setCustomerInfo({ name: '', phone: '', email: '', address: '' })
    setIsCheckingOut(false)
  }

  const handleInstagramOrder = () => {
    if (!validateForm()) {
      alert('Please fill in all customer information fields')
      return
    }
    sendInstagramMessage(items, customerInfo)
    clearCart()
    setCustomerInfo({ name: '', phone: '', email: '', address: '' })
    setIsCheckingOut(false)
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: '80px 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center',
            color: '#7f8c8d'
          }}>
            <ShoppingBag size={64} style={{ marginBottom: '24px', opacity: 0.5 }} />
            <h2 style={{ fontSize: '28px', marginBottom: '16px', color: '#2c3e50' }}>
              Your cart is empty
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '32px' }}>
              Discover our beautiful jewelry collection and add some pieces to your cart.
            </p>
            <a href="/products" className="btn btn-primary">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '32px',
          color: '#2c3e50'
        }}>
          Shopping Cart ({items.length} items)
        </h1>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '32px'
        }} className="cart-layout">
          {/* Cart Items */}
          <div>
            {items.map(item => (
              <div key={item.id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                gap: '20px',
                alignItems: 'center'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                
                <div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    marginBottom: '8px',
                    color: '#2c3e50'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ 
                    color: '#7f8c8d', 
                    fontSize: '14px',
                    marginBottom: '12px'
                  }}>
                    {item.description}
                  </p>
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    color: '#667eea'
                  }}>
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '4px'
                  }}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ 
                      minWidth: '40px',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Checkout */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                marginBottom: '20px',
                color: '#2c3e50'
              }}>
                Order Summary
              </h3>
              
              <div style={{ 
                borderBottom: '1px solid #eee',
                paddingBottom: '16px',
                marginBottom: '16px'
              }}>
                {items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '24px',
                color: '#2c3e50'
              }}>
                <span>Total:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>

              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div>
                  <h4 style={{ 
                    fontSize: '16px', 
                    marginBottom: '16px',
                    color: '#2c3e50'
                  }}>
                    Customer Information
                  </h4>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        fontSize: '14px'
                      }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        fontSize: '14px'
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        fontSize: '14px'
                      }}
                    />
                    <textarea
                      name="address"
                      placeholder="Delivery Address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <button
                      onClick={handleWhatsAppOrder}
                      style={{
                        background: '#25D366',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      <MessageCircle size={18} />
                      Order via WhatsApp
                    </button>
                    
                    <button
                      onClick={handleInstagramOrder}
                      style={{
                        background: '#E4405F',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      <Instagram size={18} />
                      Order via Instagram
                    </button>
                    
                    <button
                      onClick={() => setIsCheckingOut(false)}
                      className="btn btn-secondary"
                      style={{ fontSize: '14px' }}
                    >
                      Back to Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .cart-layout {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default Cart