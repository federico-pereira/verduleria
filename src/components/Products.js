import React, { useMemo, useState } from 'react';
import { productos } from '../data/Data';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image, Button, Badge } from 'react-bootstrap';
import ProductSearchBar from './ProductSearchBar';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

export default function Products({ category = 'todas' }) {
  const [query, setQuery] = useState('');
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return productos.filter((p) => {
      const byCat = category === 'todas' || (p.category && p.category.toLowerCase() === category.toLowerCase());
      const bySearch = !term || `${p.name} ${p.descripcion ?? ''}`.toLowerCase().includes(term);
      return byCat && bySearch;
    });
  }, [query, category]);

  return (
    <>
      <ProductSearchBar onSearch={setQuery} />

      {filtered.length === 0 && (
        <p className="text-center my-4">No encontramos productos con esos filtros.</p>
      )}

      <Row xs={1} md={4} className="g-4">
        {filtered.map((p) => (
          <Col key={p.id}>
            
              <Card className="card h-100">
                <Link to={`/product/${p.id}`} className="text-decoration-none text-reset">
                  <Card.Img as={Image} fluid src={(p.images && p.images[0]) || p.img} alt={p.name} />
                </Link>
                <Card.Body className="card-body d-flex flex-column">
                  <Card.Title className="card-title mb-1">
                    <Link to={`/product/${p.id}`} className="text-decoration-none text-reset">
                      {p.name}
                    </Link>
                  </Card.Title>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-bold">{CLP.format(p.precio)}</span>
                  <Badge bg={p.stock > 0 ? 'success' : 'secondary'}>
                    {p.stock > 0 ? `Stock: ${p.stock}` : 'Sin stock'}
                  </Badge>
                </div>
                <Card.Text className="mb-3">{p.descripcion}</Card.Text>
                <Button
                  className="mt-auto"
                  disabled={p.stock <= 0}
                  onClick={() => addItem(p, 1)}
                >
                  Añadir al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
