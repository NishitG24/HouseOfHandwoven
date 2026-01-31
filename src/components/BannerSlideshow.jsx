import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Calendar } from 'lucide-react'

const BannerSlideshow = ({ products, events = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Combine products and events for slideshow
  const slides = [
    ...products.slice(0, 4).map(product => ({ ...product, type: 'product' })),
    ...events.slice(0, 2).map(event => ({ ...event, type: 'event' }))
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (!slides.length) return null

  return (
    <section style={{
      position: 'relative',
      height: '500px',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0F4C75 0%, #3282B8 100%)',
      marginBottom: '60px'
    }}>
      <div style={{
        display: 'flex',
        transform: `translateX(-${currentSlide * 100}%)`,
        transition: 'transform 0.8s ease-in-out',
        height: '100%'
      }}>
        {slides.map((slide, index) => (
          <div
            key={slide._id || slide.id || index}
            style={{
              minWidth: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              background: slide.type === 'product' 
                ? `linear-gradient(rgba(15, 76, 117, 0.7), rgba(50, 130, 184, 0.7)), url(${slide.image}) center/cover`
                : 'linear-gradient(135deg, #0F4C75 0%, #3282B8 100%)'
            }}
          >
            <div className="container" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center',
              color: 'white',
              zIndex: 2
            }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  padding: '6px 16px',
                  background: 'rgba(0, 191, 165, 0.2)',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}>
                  {slide.type === 'product' ? (
                    <><Star size={16} color="#00BFA5" />Featured Product</>
                  ) : (
                    <><Calendar size={16} color="#00BFA5" />Upcoming Exhibition</>
                  )}
                </div>
                
                <h2 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  lineHeight: '1.2',
                  fontFamily: 'serif'
                }}>
                  {slide.type === 'product' ? slide.name : slide.title}
                </h2>
                
                <p style={{
                  fontSize: '18px',
                  marginBottom: '24px',
                  opacity: '0.9',
                  lineHeight: '1.6'
                }}>
                  {slide.description}
                </p>
                
                {slide.type === 'product' ? (
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#00BFA5',
                    marginBottom: '32px'
                  }}>
                    ₹{slide.price?.toLocaleString()}
                  </div>
                ) : (
                  <div style={{
                    fontSize: '18px',
                    color: '#00BFA5',
                    marginBottom: '32px',
                    fontWeight: '600'
                  }}>
                    📅 {slide.date} | 📍 {slide.location}
                  </div>
                )}
                
                <button
                  onClick={() => {
                    if (slide.type === 'product') {
                      window.location.href = '/products';
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                  style={{
                    background: 'linear-gradient(45deg, #00BFA5, #3282B8)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    zIndex: 10,
                    position: 'relative'
                  }}
                >
                  {slide.type === 'product' ? 'View Details' : 'Learn More'}
                </button>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {slide.type === 'product' ? (
                  <img
                    src={slide.image}
                    alt={slide.name}
                    style={{
                      width: '350px',
                      height: '350px',
                      objectFit: 'cover',
                      borderRadius: '20px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      border: '4px solid rgba(0, 191, 165, 0.3)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '350px',
                    height: '350px',
                    background: 'linear-gradient(135deg, #00BFA5, #3282B8)',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '40px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎨</div>
                    <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Exhibition</h3>
                    <p style={{ fontSize: '16px' }}>{slide.date}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          zIndex: 3
        }}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          zIndex: 3
        }}
      >
        <ChevronRight size={24} />
      </button>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 3
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentSlide ? '#00BFA5' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default BannerSlideshow