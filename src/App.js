import { Routes, Route } from 'react-router-dom';
import React from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carrito from './components/Carrito';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import ProductoList from './components/ProductoList';
import AdminPanel from './pages/AdminPanel';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="site">
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Carrito />} />
            <Route path="/productoList" element={<ProductoList />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/products" element={<ProductManagement />} />
            <Route path="/product/:id" element={<ProductDetail />} />   {/* ⬅️ nueva ruta */}
            <Route path="*" element={<div style={{ padding: '3rem 1rem' }}>Página no encontrada</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
