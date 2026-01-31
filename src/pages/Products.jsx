import React, { useState, useEffect, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'
import { categories } from '../data/products'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll()
      setProducts(response.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      // Fallback to static data if API fails
      const { products: staticProducts } = await import('../data/products')
      setProducts(staticProducts)
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }, [products, searchTerm, selectedCategory, sortBy])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div>Loading products...</div>
      </div>
    )
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
            color: '#0F4C75'
          }}>
            Our Jewelry Collection
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#0F4C75',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover our complete range of handwoven jewelry pieces. 
            Each item is crafted with love and attention to detail.
          </p>
        </div>

        {/* Filters and Search */}
        <div style={{ 
          background: 'linear-gradient(135deg, #E3F2FD, #BBE1FA)',
          padding: '32px',
          borderRadius: '20px',
          boxShadow: '0 8px 25px rgba(15, 76, 117, 0.1)',
          marginBottom: '40px',
          border: '2px solid rgba(0, 191, 165, 0.2)'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            alignItems: 'end'
          }}>
            {/* Search */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600',
                color: '#0F4C75',
                fontSize: '16px'
              }}>
                🔍 Search Handcrafts
              </label>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={20} 
                  style={{ 
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#00BFA5'
                  }} 
                />
                <input
                  type="text"
                  placeholder="Search jewelry & crafts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    border: '2px solid rgba(0, 191, 165, 0.3)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    background: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00BFA5'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 191, 165, 0.3)'}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600',
                color: '#0F4C75',
                fontSize: '16px'
              }}>
                🎨 Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid rgba(0, 191, 165, 0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  color: '#0F4C75'
                }}
              >
                <option value="all">All Handcrafts</option>
                <optgroup label="Necklaces">
                  <option value="necklaces-fabric">Fabric Necklaces</option>
                  <option value="necklaces-embroidery">Embroidery Necklaces</option>
                  <option value="necklaces-clay">Clay Necklaces</option>
                  <option value="necklaces-wooden">Wooden Necklaces</option>
                </optgroup>
                <optgroup label="Bangles">
                  <option value="bangles-fabric">Fabric Bangles</option>
                  <option value="bangles-wooden">Wooden Bangles</option>
                </optgroup>
                <optgroup label="Earrings">
                  <option value="earrings-clay">Clay Earrings</option>
                  <option value="earrings-embroidery">Embroidery Earrings</option>
                  <option value="earrings-terracotta">Terracotta Earrings</option>
                  <option value="earrings-wood">Wood Earrings</option>
                  <option value="earrings-fabric">Fabric Earrings</option>
                  <option value="earrings-crochets">Crochet Earrings</option>
                  <option value="earrings-long-mirror">Long Mirror Earrings</option>
                </optgroup>
                <optgroup label="Crochet Products">
                  <option value="crochet-hair-clips">Hair Clips</option>
                  <option value="crochet-bow">Bow</option>
                  <option value="crochet-flower">Flower</option>
                  <option value="crochet-key-chains">Key Chains</option>
                  <option value="crochet-bags">Bags</option>
                  <option value="crochet-thalposh">ThalPosh</option>
                </optgroup>
                <option value="fridge-magnets">Fridge Magnets</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600',
                color: '#0F4C75',
                fontSize: '16px'
              }}>
                📊 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid rgba(0, 191, 165, 0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  color: '#0F4C75'
                }}
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ 
          marginBottom: '24px',
          color: '#0F4C75',
          fontSize: '16px'
        }}>
          Showing {filteredAndSortedProducts.length} of {products.length} products
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-3">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center',
            padding: '80px 20px',
            color: '#0F4C75'
          }}>
            <Filter size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>
              No products found
            </h3>
            <p>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products