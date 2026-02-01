import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, Star, Package } from 'lucide-react'
import { productsAPI } from '../../services/api'
import { formatPrice } from '../../utils/messaging'

const ProductManagement = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [filter])

  const fetchProducts = async () => {
    try {
      const params = filter !== 'all' ? { category: filter } : {}
      const response = await productsAPI.getAll(params)
      setProducts(response.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productsAPI.delete(id)
        setProducts(products.filter(p => p._id !== id))
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  const toggleFeatured = async (product) => {
    try {
      const updatedProduct = { ...product, featured: !product.featured }
      await productsAPI.update(product._id, updatedProduct)
      setProducts(products.map(p => 
        p._id === product._id ? { ...p, featured: !p.featured } : p
      ))
    } catch (error) {
      alert('Failed to update product')
    }
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        Loading products...
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
          <div>
            <Link to="/admin/dashboard" style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              ← Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '24px', color: '#2c3e50', margin: '8px 0 0' }}>
              Product Management
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/admin/events" style={{
              background: '#28a745',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Manage Events
            </Link>
            <Link
              to="/admin/products/new"
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '32px 20px' }}>
        {/* Filters */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '8px 16px',
                border: '2px solid',
                borderColor: filter === 'all' ? '#667eea' : '#e9ecef',
                background: filter === 'all' ? '#667eea' : 'white',
                color: filter === 'all' ? 'white' : '#6c757d',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              All ({products.length})
            </button>
            {['necklaces', 'earrings', 'bracelets', 'rings', 'pendants', 'anklets'].map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                style={{
                  padding: '8px 16px',
                  border: '2px solid',
                  borderColor: filter === category ? '#667eea' : '#e9ecef',
                  background: filter === category ? '#667eea' : 'white',
                  color: filter === category ? 'white' : '#6c757d',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textTransform: 'capitalize'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
            <Package size={48} style={{ color: '#dee2e6', marginBottom: '16px' }} />
            <h3 style={{ color: '#6c757d', marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: '#adb5bd', marginBottom: '24px' }}>
              {filter === 'all' ? 'Start by adding your first product' : `No products in ${filter} category`}
            </p>
            <Link to="/admin/products/new" className="btn btn-primary">
              Add Product
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {products.map(product => (
              <div key={product._id} className="card" style={{ position: 'relative' }}>
                {product.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#ffc107',
                    color: '#212529',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    zIndex: 1
                  }}>
                    <Star size={12} />
                    Featured
                  </div>
                )}
                
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                />
                
                <h3 style={{ 
                  fontSize: '18px', 
                  marginBottom: '8px',
                  color: '#2c3e50'
                }}>
                  {product.name}
                </h3>
                
                <p style={{ 
                  color: '#7f8c8d', 
                  fontSize: '14px',
                  marginBottom: '12px',
                  lineHeight: '1.4'
                }}>
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...` 
                    : product.description
                  }
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{ 
                    fontSize: '18px', 
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
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => toggleFeatured(product)}
                    style={{
                      background: product.featured ? '#ffc107' : '#f8f9fa',
                      color: product.featured ? '#212529' : '#6c757d',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                    title={product.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <Star size={14} />
                  </button>
                  
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    style={{
                      background: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <Edit size={14} />
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    style={{
                      background: '#dc3545',
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
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductManagement