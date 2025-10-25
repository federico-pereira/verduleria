// src/pages/ProductDetail.js
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos } from '../data/Data';
import { Row, Col, Card, Button, Image, Badge, InputGroup, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

export default function ProductDetail() {
  const { id } = useParams();
  const pid = Number.isNaN(Number(id)) ? id : Number(id);
  const product = useMemo(() => productos.find(p => p.id === pid), [pid]);
  const { addItem } = useCart();

  const gallery = product ? (product.images?.length ? product.images : [product.img]) : [];
  const [current, setCurrent] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    document.title = product ? `${product.name} • HuertoHogar` : 'Producto no encontrado • HuertoHogar';
    return () => { document.title = 'HuertoHogar'; };
  }, [product]);

  const next = useCallback(() => {
    if (gallery.length < 2) return;
    setCurrent(i => (i + 1) % gallery.length);
  }, [gallery.length]);

  const prev = useCallback(() => {
    if (gallery.length < 2) return;
    setCurrent(i => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  if (!product) {
    return (
      <div className="container py-5 product-detail">
        <h2 className="mb-3">Producto no encontrado</h2>
        <p>El artículo que buscas no existe o fue removido.</p>
        <Link to="/" className="btn btn-success">Volver al inicio</Link>
      </div>
    );
  }

  const max = product.stock ?? Infinity;
  const onAdd = () => addItem(product, qty);

  const relacionados = productos
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container py-4 product-detail">
      <nav className="mb-3">
        <Link to="/" className="text-decoration-none">Inicio</Link>{' '}
        <span className="text-muted">/</span>{' '}
        <span className="text-muted">{product.category || 'Productos'}</span>{' '}
        <span className="text-muted">/</span>{' '}
        <strong>{product.name}</strong>
      </nav>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100">
            {/* flechas DENTRO de este body */}
            <Card.Body
              className="d-flex align-items-center justify-content-center position-relative"
              style={{ minHeight: 320 }}
              tabIndex={0}
              onKeyDown={onKey}
              aria-label="Galería de imágenes del producto. Usa flechas izquierda/derecha para navegar."
            >
              {gallery.length > 1 && (
                <>
                  <button
                    className="gallery-arrow left"
                    type="button"
                    onClick={prev}
                    aria-label="Imagen anterior"
                  >
                    ‹
                  </button>
                  <button
                    className="gallery-arrow right"
                    type="button"
                    onClick={next}
                    aria-label="Imagen siguiente"
                  >
                    ›
                  </button>
                </>
              )}

              <Image
                src={gallery[current]}
                alt={`${product.name} ${current + 1}`}
                fluid
                rounded
                loading="eager"
                style={{ maxHeight: 460, objectFit: 'contain' }}
              />
            </Card.Body>
          </Card>
          {/* eliminamos la tira de miniaturas para evitar solapado */}
        </Col>

        <Col md={6}>
          <h2 className="mb-2">{product.name}</h2>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge bg="secondary">{product.category || 'General'}</Badge>
            <Badge bg={product.stock > 0 ? 'success' : 'secondary'}>
              {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
            </Badge>
          </div>

          <div className="fs-3 fw-bold mb-3">{CLP.format(product.precio)}</div>
          <p className="text-muted">{product.descripcion}</p>

          <div className="d-flex align-items-center gap-2 my-3">
            <InputGroup style={{ width: 160 }}>
              <Button
                variant="outline-secondary"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                disabled={qty <= 1}
              >
                −
              </Button>
              <Form.Control
                type="number"
                min={1}
                max={max}
                value={qty}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isNaN(v)) return;
                  setQty(Math.max(1, Math.min(v, max)));
                }}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setQty(q => Math.min(max, q + 1))}
                disabled={qty >= max}
              >
                +
              </Button>
            </InputGroup>

            <Button
              variant="success"
              className="px-4"
              disabled={product.stock <= 0}
              onClick={onAdd}
            >
              Añadir al carrito
            </Button>
          </div>

          <div className="text-muted small">
            * Límite por compra: {max === Infinity ? '—' : `${max} unidades`}
          </div>
        </Col>
      </Row>

      {/* Productos relacionados sigue igual; NO se usa para la galería */}
      {relacionados.length > 0 && (
        <section className="product-detail__related mt-4">
          <hr className="my-3" />
          <h4 className="mb-3">Productos relacionados</h4>
          <Row xs={1} sm={2} md={4} className="g-3">
            {relacionados.map(r => (
              <Col key={r.id}>
                <Card className="h-100">
                  <Link to={`/product/${r.id}`} className="text-decoration-none text-reset">
                    <Card.Img variant="top" src={(r.images?.[0]) || r.img} alt={r.name} />
                    <Card.Body>
                      <div className="fw-semibold mb-1">{r.name}</div>
                      <div className="text-muted small mb-1">{r.category}</div>
                      <div className="fw-bold">{CLP.format(r.precio)}</div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </div>
  );
}
