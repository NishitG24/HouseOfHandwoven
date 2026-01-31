import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AdminProvider } from './context/AdminContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductManagement from './pages/admin/ProductManagement'
import ProductForm from './pages/admin/ProductForm'
import AdminEvents from './pages/admin/AdminEvents'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<><Header /><Home /><Footer /></>} />
              <Route path="/products" element={<><Header /><Products /><Footer /></>} />
              <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
              <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <ProductManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/new" element={
                <ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/events" element={
                <ProtectedRoute>
                  <AdminEvents />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/edit/:id" element={
                <ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AdminProvider>
  )
}

export default App