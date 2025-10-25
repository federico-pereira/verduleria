import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';

import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Products from '../components/Products';

export default function Home() {
  const [cat, setCat] = useState('todas');

  return (
    <Container>
      <Hero />
      <Categories selected={cat} onSelect={setCat} />
      <Products category={cat} />
    </Container>
  );
}
