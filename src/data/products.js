export const products = [
  {
    id: 1,
    name: "Elegant Pearl Necklace",
    price: 2500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    description: "Handwoven pearl necklace with intricate beadwork",
    category: "necklaces"
  },
  {
    id: 2,
    name: "Golden Thread Earrings",
    price: 1200,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    description: "Delicate golden thread earrings with traditional patterns",
    category: "earrings"
  },
  {
    id: 3,
    name: "Silver Charm Bracelet",
    price: 1800,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    description: "Handcrafted silver bracelet with multiple charms",
    category: "bracelets"
  },
  {
    id: 4,
    name: "Ruby Stone Ring",
    price: 3200,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    description: "Exquisite ruby ring with handwoven gold setting",
    category: "rings"
  },
  {
    id: 5,
    name: "Turquoise Pendant",
    price: 1500,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop",
    description: "Beautiful turquoise pendant with silver chain",
    category: "pendants"
  },
  {
    id: 6,
    name: "Beaded Anklet",
    price: 800,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    description: "Colorful beaded anklet with traditional motifs",
    category: "anklets"
  },
  {
    id: 7,
    name: "Diamond Stud Earrings",
    price: 4500,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
    description: "Classic diamond studs with handcrafted gold setting",
    category: "earrings"
  },
  {
    id: 8,
    name: "Emerald Choker",
    price: 5200,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    description: "Stunning emerald choker with intricate goldwork",
    category: "necklaces"
  }
]

export const categories = [
  { id: 'all', name: 'All Products' },
  { 
    id: 'necklaces', 
    name: 'Necklaces',
    subcategories: [
      { id: 'necklaces-fabric', name: 'Fabric' },
      { id: 'necklaces-embroidery', name: 'Embroidery' },
      { id: 'necklaces-clay', name: 'Clay' },
      { id: 'necklaces-wooden', name: 'Wooden' }
    ]
  },
  { 
    id: 'bangles', 
    name: 'Bangles',
    subcategories: [
      { id: 'bangles-fabric', name: 'Fabric' },
      { id: 'bangles-wooden', name: 'Wooden' }
    ]
  },
  { 
    id: 'earrings', 
    name: 'Earrings',
    subcategories: [
      { id: 'earrings-clay', name: 'Clay' },
      { id: 'earrings-embroidery', name: 'Embroidery' },
      { id: 'earrings-terracotta', name: 'Terracotta' },
      { id: 'earrings-wood', name: 'Wood' },
      { id: 'earrings-fabric', name: 'Fabric' },
      { id: 'earrings-crochets', name: 'Crochets' },
      { id: 'earrings-long-mirror', name: 'Long Mirror' }
    ]
  },
  { 
    id: 'crochet-products', 
    name: 'Crochet Products',
    subcategories: [
      { id: 'crochet-hair-clips', name: 'Hair Clips' },
      { id: 'crochet-bow', name: 'Bow' },
      { id: 'crochet-flower', name: 'Flower' },
      { id: 'crochet-key-chains', name: 'Key Chains' },
      { id: 'crochet-bags', name: 'Bags' },
      { id: 'crochet-thalposh', name: 'ThalPosh' }
    ]
  },
  { id: 'fridge-magnets', name: 'Fridge Magnets' }
]