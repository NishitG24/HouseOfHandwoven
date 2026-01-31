import React from 'react'
import { Instagram, MessageCircle, Mail, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ 
      background: '#2c3e50', 
      color: 'white', 
      padding: '48px 0 24px' 
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '32px', 
          marginBottom: '32px' 
        }}>
          {/* Business Info */}
          <div>
            <h3 style={{ 
              fontSize: '20px', 
              marginBottom: '16px', 
              color: '#ecf0f1' 
            }}>
              House of HandWoven Jewellery Collection
            </h3>
            <p style={{ 
              color: '#bdc3c7', 
              lineHeight: '1.6', 
              marginBottom: '16px' 
            }}>
              Exquisite handcrafted jewelry pieces made with love and traditional techniques. 
              Each piece tells a unique story of artistry and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '16px', 
              marginBottom: '16px', 
              color: '#ecf0f1' 
            }}>
              Quick Links
            </h4>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px' 
            }}>
              <a href="/" style={{ 
                color: '#bdc3c7', 
                textDecoration: 'none', 
                transition: 'color 0.3s ease' 
              }}>
                Home
              </a>
              <a href="/products" style={{ 
                color: '#bdc3c7', 
                textDecoration: 'none', 
                transition: 'color 0.3s ease' 
              }}>
                Products
              </a>
              <a href="/contact" style={{ 
                color: '#bdc3c7', 
                textDecoration: 'none', 
                transition: 'color 0.3s ease' 
              }}>
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 style={{ 
              fontSize: '16px', 
              marginBottom: '16px', 
              color: '#ecf0f1' 
            }}>
              Connect With Us
            </h4>
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '16px' 
            }}>
              <a 
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: '#25D366', 
                  transition: 'transform 0.3s ease' 
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <MessageCircle size={24} />
              </a>
              <a 
                href={`https://instagram.com/${import.meta.env.VITE_INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: '#E4405F', 
                  transition: 'transform 0.3s ease' 
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Instagram size={24} />
              </a>
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px', 
              color: '#bdc3c7', 
              fontSize: '14px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} />
                <span>+91 {import.meta.env.VITE_WHATSAPP_NUMBER}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Instagram size={16} />
                <span>@{import.meta.env.VITE_INSTAGRAM_HANDLE}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ 
          borderTop: '1px solid #34495e', 
          paddingTop: '24px', 
          textAlign: 'center', 
          color: '#95a5a6', 
          fontSize: '14px' 
        }}>
          <p>
            © {currentYear} House of HandWoven Jewellery Collection. All rights reserved.
          </p>
          <p style={{ marginTop: '8px' }}>
            Crafted with ❤️ for jewelry lovers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer