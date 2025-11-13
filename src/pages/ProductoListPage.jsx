import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';

import ProductoList from '../components/ProductoList';

export default function ProductListPage() {
  return (
    <Container>
        <ProductoList />
    </Container>
  );
}
