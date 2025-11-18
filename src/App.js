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
            <Route path="/product/:id" element={<ProductDetail />} />   {/* ⬅️ nueva ruta */}
            <Route path="*" element={<div style={{ padding: '3rem 1rem' }}>Página no encontrada</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
