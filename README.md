# House of HandWoven Jewellery Collection

A modern, responsive e-commerce website for handcrafted jewelry with WhatsApp and Instagram integration for seamless customer communication.

## 🌟 Features

- **Product Catalog**: Beautiful display of handwoven jewelry with images, descriptions, and prices
- **Shopping Cart**: Add multiple items and manage quantities
- **Guest Checkout**: No account creation required - streamlined user experience
- **WhatsApp Integration**: Direct order placement via WhatsApp with pre-filled messages
- **Instagram Integration**: Alternative ordering through Instagram DM
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Search & Filter**: Find products by name, category, and price range
- **SEO Optimized**: Meta tags and structured content for better search visibility
- **Secure Configuration**: Environment variables for sensitive data protection
- **Admin Panel**: Complete product management system
- **Database Integration**: MongoDB for dynamic product management
- **CRUD Operations**: Create, read, update, delete products
- **Authentication**: Secure admin login with JWT

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Styling**: CSS-in-JS with responsive design
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HandWovenJwel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   The `.env` file is already configured with your business details:
   ```env
   VITE_WHATSAPP_NUMBER=8602296793
   VITE_INSTAGRAM_HANDLE=alive_incolors
   VITE_API_URL=http://localhost:5000/api
   VITE_BUSINESS_NAME=House of HandWoven Jewellery Collection
   ```
   
   Backend environment variables in `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://nishitautomationtest_db_user:mrPtSCZLR5ksyLeM@handwovenjwel.14wmjuu.mongodb.net/handwoven_jewellery
   JWT_SECRET=your_jwt_secret_key_here_make_it_strong
   PORT=5000
   NODE_ENV=development
   ADMIN_EMAIL=admin@handwovenjewellery.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start Development Servers**
   
   **Option 1: Use the startup script (Recommended)**
   ```bash
   ./start.sh
   ```
   
   **Option 2: Manual startup**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run seed  # Seed database with initial data
   npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

   The application will be available at:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - Admin Panel: `http://localhost:3000/admin/login`

## 📱 How It Works

### Customer Journey
1. **Browse Products**: Customers can view all jewelry items with detailed information
2. **Add to Cart**: Select multiple items and specify quantities
3. **Guest Checkout**: Fill in delivery information without creating an account
4. **Choose Communication**: Select WhatsApp or Instagram for order placement
5. **Direct Contact**: Order details are automatically formatted and sent to your business

### Order Processing
- **WhatsApp**: Opens WhatsApp with pre-filled message containing order details
- **Instagram**: Copies order details to clipboard and opens Instagram profile
- **Order Format**: Includes product names, prices, quantities, total amount, and customer information

## 🎨 Customization

### Admin Panel Access
- **URL**: `http://localhost:3000/admin/login`
- **Email**: admin@handwovenjewellery.com
- **Password**: admin123

### Managing Products
Use the admin panel to:
- Add new products with images, descriptions, and pricing
- Edit existing products
- Delete products
- Mark products as featured
- Manage inventory status

### Adding Products Programmatically
Edit `backend/seed.js` to add initial products:

```javascript
{
  id: 9,
  name: "Your New Product",
  price: 2000,
  image: "https://your-image-url.com/image.jpg",
  description: "Product description",
  category: "necklaces" // or rings, earrings, bracelets, etc.
}
```

### Styling
- Global styles: `src/index.css`
- Component-specific styles: Inline styles in each component
- Responsive breakpoints: Mobile-first approach with CSS media queries

### Business Information
Update your business details in the `.env` file:
- `VITE_WHATSAPP_NUMBER`: Your WhatsApp business number
- `VITE_INSTAGRAM_HANDLE`: Your Instagram handle (without @)
- `VITE_BUSINESS_NAME`: Your business name

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Environment Variables in Vercel**
   Add these in your Vercel project settings:
   ```
   VITE_WHATSAPP_NUMBER=8602296793
   VITE_INSTAGRAM_HANDLE=alive_incolors
   VITE_BUSINESS_NAME=House of HandWoven Jewellery Collection
   ```

### Alternative Deployment Options
- **Netlify**: Similar process to Vercel
- **GitHub Pages**: For static hosting
- **Firebase Hosting**: Google's hosting solution

## 📊 Analytics & SEO

### Built-in SEO Features
- Meta tags for better search engine visibility
- Semantic HTML structure
- Image alt tags for accessibility
- Responsive design for mobile SEO

### Adding Analytics
To add Google Analytics or other tracking:

1. Add tracking script to `index.html`
2. Implement event tracking in components
3. Track user interactions (product views, cart additions, orders)

## 🔒 Security Features

- Environment variables for sensitive data
- No exposed API keys in client code
- Secure WhatsApp and Instagram integration
- Input validation and sanitization

## 🛡️ Best Practices Implemented

### Performance
- Optimized images with proper sizing
- Lazy loading for better performance
- Minimal bundle size with Vite
- Efficient state management

### User Experience
- Mobile-first responsive design
- Intuitive navigation
- Clear call-to-action buttons
- Seamless checkout process

### Code Quality
- Component-based architecture
- Reusable utility functions
- Clean, maintainable code structure
- Proper error handling

## 📞 Support & Maintenance

### Regular Updates
- Update product catalog regularly
- Monitor and respond to customer inquiries
- Keep dependencies updated for security

### Customer Support
- WhatsApp: +91 8602296793
- Instagram: @alive_incolors
- Response time: Within 24 hours

## 🎯 Future Enhancements

### Potential Features
- **Admin Panel**: Manage products and orders
- **Inventory Management**: Track stock levels
- **Customer Reviews**: Product rating system
- **Wishlist**: Save favorite items
- **Multi-language Support**: Reach broader audience
- **Payment Gateway**: Direct online payments
- **Email Notifications**: Order confirmations

### Technical Improvements
- **Backend API**: Node.js/Express server
- **Database**: MongoDB for data persistence
- **Authentication**: Admin login system
- **Image Optimization**: CDN integration
- **Performance Monitoring**: Analytics dashboard

## 📄 License

This project is created for House of HandWoven Jewellery Collection. All rights reserved.

## 🤝 Contributing

This is a private business website. For any modifications or improvements, please contact the business owner.

---

**Built with ❤️ for House of HandWoven Jewellery Collection**

*Crafting digital experiences as beautiful as your jewelry*