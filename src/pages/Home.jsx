import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Heart, Scissors, Palette } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import BannerSlideshow from '../components/BannerSlideshow'
import EventsSection from '../components/EventsSection'
import { productsAPI, eventsAPI } from '../services/api'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [featuredResponse, allResponse, eventsResponse] = await Promise.all([
        productsAPI.getFeatured(),
        productsAPI.getAll(),
        eventsAPI.getAll()
      ])
      setFeaturedProducts(featuredResponse.data)
      setAllProducts(allResponse.data)
      setEvents(eventsResponse.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      const { products } = await import('../data/products')
      setFeaturedProducts(products.slice(0, 4))
      setAllProducts(products)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Banner Slideshow */}
      {!loading && allProducts.length > 0 && (
        <BannerSlideshow products={allProducts} events={events} />
      )}

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(15, 76, 117, 0.9) 0%, rgba(50, 130, 184, 0.8) 100%), url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%2300BFA5\\" fill-opacity=\\"0.1\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        color: 'white',
        padding: 'clamp(60px, 15vw, 120px) 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\"%3E%3Cpath d=\\"M20,20 Q50,5 80,20 Q95,50 80,80 Q50,95 20,80 Q5,50 20,20\\" fill=\\"none\\" stroke=\\"%23d4af37\\" stroke-width=\\"0.5\\" opacity=\\"0.3\\"/%3E%3C/svg%3E") repeat',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)'
          }}>
            <Heart size={24} color="#00BFA5" />
            <span style={{ fontSize: '16px', fontWeight: '500' }}>Handcrafted with Love</span>
            <Heart size={24} color="#00BFA5" />
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(32px, 8vw, 56px)', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            lineHeight: '1.2',
            fontFamily: 'serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            House of HandWoven
            <br />
            <span style={{ color: '#00BFA5' }}>Collection</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(16px, 4vw, 22px)', 
            marginBottom: '40px', 
            opacity: '0.95',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.6',
            fontStyle: 'italic',
            padding: '0 20px'
          }}>
            Where tradition meets artistry. Each piece tells a story of skilled hands, 
            cultural heritage, and timeless beauty crafted just for you.
          </p>
          
          <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/products" 
              style={{
                background: 'linear-gradient(45deg, #00BFA5, #3282B8)',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '50px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '18px',
                fontWeight: '600',
                boxShadow: '0 8px 25px rgba(0, 191, 165, 0.3)',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
            >
              <Palette size={20} />
              Explore Collection
              <ArrowRight size={20} />
            </Link>
            
            <Link 
              to="/contact" 
              style={{
                background: 'transparent',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '50px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '18px',
                fontWeight: '600',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <Heart size={20} />
              Custom Orders
            </Link>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
          `
        }} />
      </section>

      {/* Events & Exhibitions Section */}
      <EventsSection />

      {/* Featured Products */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg, #0F4C75 0%, #3282B8 100%)' }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '60px' 
          }}>
            <h2 style={{ 
              fontSize: '42px', 
              marginBottom: '20px',
              color: 'white',
              fontFamily: 'serif'
            }}>
              Handpicked Masterpieces
            </h2>
            <p style={{ 
              fontSize: '18px', 
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover our most cherished handwoven creations, 
              each piece carefully selected for its exceptional artistry and beauty.
            </p>
          </div>
          
          <div className="grid grid-2" style={{ marginBottom: '48px' }}>
            {loading ? (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '48px',
                color: 'white'
              }}>
                Loading our finest pieces...
              </div>
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
            )}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Link 
              to="/products" 
              style={{
                background: 'linear-gradient(45deg, #00BFA5, #3282B8)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '50px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 8px 25px rgba(0, 191, 165, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <Palette size={18} />
              View Complete Collection
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home