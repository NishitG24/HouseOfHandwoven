import express from 'express'
import Product from '../models/Product.js'
import { authenticateAdmin } from '../middleware/auth.js'

const router = express.Router()

// Static fallback data
const staticProducts = [
  {
    _id: '1',
    id: 1,
    name: 'Handwoven Fabric Necklace',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    description: 'Beautiful handwoven fabric necklace with intricate patterns',
    category: 'necklaces-fabric',
    featured: true,
    quantity: 10
  },
  {
    _id: '2',
    id: 2,
    name: 'Clay Earrings Set',
    price: 800,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400',
    description: 'Elegant clay earrings with traditional designs',
    category: 'earrings-clay',
    featured: true,
    quantity: 15
  },
  {
    _id: '3',
    id: 3,
    name: 'Wooden Bangles',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400',
    description: 'Handcrafted wooden bangles with natural finish',
    category: 'bangles-wooden',
    featured: true,
    quantity: 8
  },
  {
    _id: '4',
    id: 4,
    name: 'Embroidery Necklace',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    description: 'Intricate embroidery work on premium fabric necklace',
    category: 'necklaces-embroidery',
    featured: true,
    quantity: 5
  }
]

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    // Fallback to static data if MongoDB is unavailable
    console.log('Using static product data')
    const { category, search, sort } = req.query
    let filteredProducts = [...staticProducts]
    
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }
    
    if (search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    switch (sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name':
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    
    res.json(filteredProducts)
  }
})

// Get featured products (public)
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(4)
    res.json(products)
  } catch (error) {
    // Fallback to static data
    console.log('Using static featured products')
    res.json(staticProducts.filter(p => p.featured))
  }
})

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    // Fallback to static data
    const product = staticProducts.find(p => p._id === req.params.id || p.id.toString() === req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  }
})

// Create product (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: 'Database unavailable. Product creation disabled.' })
  }
})

// Update product (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: 'Database unavailable. Product update disabled.' })
  }
})

// Delete product (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Database unavailable. Product deletion disabled.' })
  }
})

export default router