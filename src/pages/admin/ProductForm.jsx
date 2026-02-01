import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import { productsAPI } from '../../services/api'

const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'necklaces-fabric',
    featured: false,
    inStock: true,
    quantity: ''
  })
  const [imageUploadType, setImageUploadType] = useState('url')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchProduct()
    }
  }, [id, isEdit])

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id)
      setFormData(response.data)
    } catch (error) {
      setError('Failed to fetch product')
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      }

      if (isEdit) {
        await productsAPI.update(id, productData)
      } else {
        await productsAPI.create(productData)
      }

      navigate('/admin/products')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '16px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link to="/admin/dashboard" style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '24px', color: '#2c3e50', margin: 0 }}>
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
          <Link to="/admin/products" style={{
            background: '#667eea',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            View All Products
          </Link>
        </div>
      </header>

      <div className="container" style={{ padding: '32px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card">
            <div className="admin-form-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Available stock"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                Product Image *
              </label>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '20px', color: '#2c3e50', display: 'inline-flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    value="url"
                    checked={imageUploadType === 'url'}
                    onChange={(e) => {
                      setImageUploadType(e.target.value)
                      if (selectedFile) setSelectedFile(null)
                    }}
                    style={{ marginRight: '5px' }}
                  />
                  Image URL
                </label>
                <label style={{ color: '#2c3e50', display: 'inline-flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    value="upload"
                    checked={imageUploadType === 'upload'}
                    onChange={(e) => {
                      setImageUploadType(e.target.value)
                      setFormData({ ...formData, image: '' })
                    }}
                    style={{ marginRight: '5px' }}
                  />
                  Upload Image
                </label>
              </div>
              
              {imageUploadType === 'url' ? (
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Max file size: 2MB
                  </p>
                  {selectedFile && (
                    <p style={{ marginTop: '5px', fontSize: '14px', color: '#667eea' }}>
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              )}
              
              {formData.image && (
                <div style={{ marginTop: '12px' }}>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '2px solid #e9ecef'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                >
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ fontWeight: '600', color: '#2c3e50' }}>
                    Featured Product
                  </span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ fontWeight: '600', color: '#2c3e50' }}>
                    In Stock
                  </span>
                </label>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <Link
                to="/admin/products"
                className="btn btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                <Save size={18} />
                {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductForm