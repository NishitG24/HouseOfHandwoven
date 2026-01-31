# HandWoven Jewellery Store - Complete Setup Guide

## 🎯 Project Overview

Your HandWoven Jewellery business website is now a full-stack MERN application with:

### ✅ **Frontend Features**
- React.js with Vite for fast development
- Responsive design for all devices
- Product catalog with search and filtering
- Shopping cart with guest checkout
- WhatsApp & Instagram integration for orders
- SEO optimized pages

### ✅ **Backend Features**
- Node.js/Express.js REST API
- MongoDB Atlas database integration
- JWT authentication for admin
- Complete CRUD operations for products
- Secure environment variable handling

### ✅ **Admin Panel**
- Secure login system
- Dashboard with statistics
- Product management (Create, Read, Update, Delete)
- Featured products management
- Category-wise product organization

## 🚀 Quick Start

### 1. **Database Setup**
Your MongoDB connection is already configured:
```
mongodb+srv://nishitautomationtest_db_user:mrPtSCZLR5ksyLeM@handwovenjwel.14wmjuu.mongodb.net/handwoven_jewellery
```

### 2. **Start the Application**
```bash
# Make sure you're in the project directory
cd HandWovenJwel

# Run the startup script (starts both frontend and backend)
./start.sh
```

### 3. **Access Points**
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **API**: http://localhost:5000/api

### 4. **Admin Credentials**
- **Email**: admin@handwovenjewellery.com
- **Password**: admin123

## 📊 Admin Panel Guide

### Dashboard Features
- Total products count
- Featured products count
- Category breakdown
- Quick action buttons

### Product Management
1. **Add Products**: Click "Add New Product" button
2. **Edit Products**: Click edit icon on any product
3. **Delete Products**: Click delete icon (with confirmation)
4. **Toggle Featured**: Click star icon to feature/unfeature products
5. **Filter by Category**: Use category buttons to filter products

### Product Form Fields
- **Name**: Product title
- **Price**: Price in INR
- **Image URL**: Direct link to product image
- **Description**: Detailed product description
- **Category**: Select from predefined categories
- **Featured**: Checkbox to mark as featured
- **In Stock**: Checkbox for inventory status

## 🛠️ Development Workflow

### Adding New Products
1. Login to admin panel
2. Click "Add New Product"
3. Fill in all required fields
4. Save the product
5. Product appears immediately on the website

### Managing Orders
Orders come through WhatsApp/Instagram with formatted messages containing:
- Customer information
- Product details with quantities
- Total amount
- Delivery address

### Updating Business Information
Edit the `.env` files to update:
- WhatsApp number
- Instagram handle
- Business name
- API endpoints

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect Vercel to your repository
3. Add environment variables in Vercel dashboard:
   ```
   VITE_WHATSAPP_NUMBER=8602296793
   VITE_INSTAGRAM_HANDLE=alive_incolors
   VITE_BUSINESS_NAME=House of HandWoven Jewellery Collection
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Backend Deployment (Railway/Render)
1. Create account on Railway or Render
2. Connect your GitHub repository
3. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://nishitautomationtest_db_user:mrPtSCZLR5ksyLeM@handwovenjwel.14wmjuu.mongodb.net/handwoven_jewellery
   JWT_SECRET=your_strong_jwt_secret_here
   PORT=5000
   NODE_ENV=production
   ADMIN_EMAIL=admin@handwovenjewellery.com
   ADMIN_PASSWORD=admin123
   ```
4. Deploy and get your backend URL
5. Update frontend VITE_API_URL to point to deployed backend

## 🔒 Security Features

### Environment Variables
- Sensitive data stored in .env files
- No hardcoded credentials in source code
- JWT tokens for admin authentication
- Secure MongoDB connection string

### Admin Authentication
- Password hashing with bcrypt
- JWT token-based sessions
- Protected routes for admin functions
- Session expiration handling

## 📱 Customer Experience

### Shopping Flow
1. Browse products on homepage/products page
2. Add items to cart
3. Proceed to guest checkout
4. Fill customer information
5. Choose WhatsApp or Instagram for order
6. Direct communication with business owner

### Order Format
```
Hello! I'm interested in ordering from House of HandWoven Jewellery Collection:

*Order Details:*
• Product Name - ₹Price (Qty: X)
• Product Name - ₹Price (Qty: X)

*Total Amount:* ₹XXXX

*Customer Information:*
Name: Customer Name
Phone: +91XXXXXXXXXX
Email: customer@email.com
Address: Full Address

Please confirm availability and delivery details.
```

## 🎯 Business Benefits

### For You (Business Owner)
- **Easy Product Management**: Add/edit products through admin panel
- **Direct Customer Communication**: Orders come via WhatsApp/Instagram
- **Professional Online Presence**: Modern, responsive website
- **SEO Optimized**: Better visibility in search engines
- **Mobile-First**: Customers can shop from any device

### For Your Customers
- **No Account Required**: Guest checkout for quick purchases
- **Multiple Products**: Add multiple items to cart
- **Direct Communication**: Instant contact via WhatsApp/Instagram
- **Mobile Friendly**: Shop easily on phones and tablets
- **Search & Filter**: Find products quickly

## 🔧 Maintenance

### Regular Tasks
1. **Add New Products**: Use admin panel to keep catalog fresh
2. **Update Featured Products**: Highlight seasonal or popular items
3. **Monitor Orders**: Respond to WhatsApp/Instagram messages promptly
4. **Update Images**: Ensure product images are high quality and current

### Technical Updates
- Keep dependencies updated for security
- Monitor database usage on MongoDB Atlas
- Backup important data regularly
- Update business information as needed

## 📞 Support

### Technical Issues
- Check console logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection is active
- Restart servers if needed

### Business Questions
- WhatsApp: +91 8602296793
- Instagram: @alive_incolors

---

**🎉 Congratulations! Your HandWoven Jewellery store is ready for business!**

The website combines beautiful design with powerful functionality, giving you complete control over your product catalog while providing customers with a seamless shopping experience.