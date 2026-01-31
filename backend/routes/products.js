import express from 'express'
import Product from '../models/Product.js'
import { authenticateAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query
    let query = {}
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    let sortOption = {}
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 }
        break
      case 'price-high':
        sortOption = { price: -1 }
        break
      case 'name':
      default:
        sortOption = { name: 1 }
        break
    }
    
    const products = await Product.find(query).sort(sortOption)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get featured products (public)
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(4)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
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
    res.status(500).json({ message: error.message })
  }
})

// Create product (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
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
    res.status(400).json({ message: error.message })
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
    res.status(500).json({ message: error.message })
  }
})

export default router