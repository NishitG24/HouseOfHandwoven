import React, { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle, Instagram, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const message = `Hello! I have an inquiry:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px' 
        }}>
          <h1 style={{ 
            fontSize: '36px', 
            marginBottom: '16px',
            color: '#2c3e50'
          }}>
            Get in Touch
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#7f8c8d',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Have questions about our jewelry or need assistance with your order? 
            We'd love to hear from you!
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start'
        }} className="contact-layout">
          {/* Contact Information */}
          <div>
            <h2 style={{ 
              fontSize: '28px', 
              marginBottom: '24px',
              color: '#2c3e50'
            }}>
              Contact Information
            </h2>
            
            <div style={{ marginBottom: '32px' }}>
              <p style={{ 
                fontSize: '16px', 
                color: '#7f8c8d',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                We're here to help you find the perfect piece of jewelry. 
                Reach out to us through any of the following channels:
              </p>

              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '16px', 
                      marginBottom: '4px',
                      color: '#2c3e50'
                    }}>
                      Phone
                    </h4>
                    <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                       {import.meta.env.VITE_WHATSAPP_NUMBER}
                    </p>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    background: '#25D366',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '16px', 
                      marginBottom: '4px',
                      color: '#2c3e50'
                    }}>
                      WhatsApp
                    </h4>
                    <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                      Quick responses for orders & inquiries
                    </p>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    background: '#E4405F',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Instagram size={20} />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '16px', 
                      marginBottom: '4px',
                      color: '#2c3e50'
                    }}>
                      Instagram
                    </h4>
                    <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                      @{import.meta.env.VITE_INSTAGRAM_HANDLE}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div style={{ 
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
              
              <a
                href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#E4405F',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Instagram size={16} />
                Follow Us
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              marginBottom: '24px',
              color: '#2c3e50'
            }}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
              </div>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '16px',
                  marginBottom: '24px',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Send size={18} />
                Send Message via WhatsApp
              </button>
            </form>

            <p style={{
              fontSize: '14px',
              color: '#7f8c8d',
              textAlign: 'center',
              marginTop: '16px'
            }}>
              Your message will be sent directly to our WhatsApp for quick response
            </p>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .contact-layout {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default Contact