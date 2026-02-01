import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'necklaces-fabric', 'necklaces-embroidery', 'necklaces-clay', 'necklaces-wooden',
      'bangles-fabric', 'bangles-wooden',
      'earrings-clay', 'earrings-embroidery', 'earrings-terracotta', 'earrings-wood', 'earrings-fabric', 'earrings-crochets', 'earrings-long-mirror',
      'crochet-hair-clips', 'crochet-bow', 'crochet-flower', 'crochet-key-chains', 'crochet-bags', 'crochet-thalposh',
      'fridge-magnets'
    ]
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('Product', productSchema)