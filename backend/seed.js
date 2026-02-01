import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'
import Admin from './models/Admin.js'
import Event from './models/Event.js'

dotenv.config()

const products = [
  {
    name: "Elegant Fabric Necklace",
    price: 1200,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    description: "Handwoven fabric necklace with intricate patterns and vibrant colors",
    category: "necklaces-fabric",
    featured: true
  },
  {
    name: "Embroidered Clay Earrings",
    price: 800,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    description: "Beautiful clay earrings with delicate embroidery work",
    category: "earrings-embroidery",
    featured: true
  },
  {
    name: "Wooden Bangle Set",
    price: 600,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    description: "Handcrafted wooden bangles with traditional carvings",
    category: "bangles-wooden",
    featured: true
  },
  {
    name: "Crochet Hair Clips",
    price: 300,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    description: "Colorful crochet hair clips perfect for everyday wear",
    category: "crochet-hair-clips",
    featured: true
  },
  {
    name: "Terracotta Drop Earrings",
    price: 450,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop",
    description: "Handmade terracotta earrings with ethnic designs",
    category: "earrings-terracotta"
  },
  {
    name: "Fabric Bangles",
    price: 400,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    description: "Soft fabric bangles with mirror work and beads",
    category: "bangles-fabric"
  },
  {
    name: "Crochet Key Chains",
    price: 150,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    description: "Cute crochet key chains in various animal shapes",
    category: "crochet-key-chains"
  },
  {
    name: "Decorative Fridge Magnets",
    price: 200,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    description: "Handcrafted fridge magnets with traditional motifs",
    category: "fridge-magnets"
  },
  {
    name: "Clay Necklace with Beads",
    price: 900,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    description: "Artistic clay necklace adorned with colorful beads",
    category: "necklaces-clay"
  },
  {
    name: "Crochet Flower Brooch",
    price: 250,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    description: "Delicate crochet flower that can be worn as brooch or hair accessory",
    category: "crochet-flower"
  }
]

const events = [
  {
    title: "Handcraft Exhibition 2024",
    date: "March 15-17, 2024",
    time: "10:00 AM - 8:00 PM",
    location: "City Art Gallery, Mumbai",
    description: "Visit us at our biggest handcraft exhibition featuring over 200 unique pieces including necklaces, bangles, and crochet products. Come explore our collection in person."
  },
  {
    title: "Spring Craft Fair",
    date: "April 10-12, 2024",
    time: "9:00 AM - 7:00 PM",
    location: "Exhibition Center, Delhi",
    description: "Join us at the Spring Craft Fair where we'll be showcasing our latest handwoven jewelry collection. Perfect opportunity to see our craftsmanship up close."
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Product.deleteMany({})
    await Admin.deleteMany({})
    await Event.deleteMany({})
    console.log('Cleared existing data')

    // Insert products
    await Product.insertMany(products)
    console.log('Products seeded successfully')

    // Insert events
    await Event.insertMany(events)
    console.log('Events seeded successfully')

    // Create admin users
    const adminUsers = [
      {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Admin'
      },
      {
        email: 'guptariya821@gmail.com',
        password: 'Riy@n1sh',
        name: 'Riya Gupta'
      },
      {
        email: 'nishitgupta241@gmail.com',
        password: 'Riy@n1sh',
        name: 'Nishit Gupta'
      }
    ]

    for (const adminData of adminUsers) {
      const admin = new Admin(adminData)
      await admin.save()
      console.log(`Admin user created: ${adminData.email}`)
    }

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()