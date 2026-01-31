import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRoutes from './routes/products.js'
import adminRoutes from './routes/admin.js'
import eventRoutes from './routes/events.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/events', eventRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'HandWoven Jewellery API is running!' })
})

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })