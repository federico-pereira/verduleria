import React from 'react';
import { Table, Button, ButtonGroup, Image, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

export default function Carrito() {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log('Checkout clicked. User:', user);
    if (!user) {
      console.log('Redirecting to login...');
      navigate('/login');
      return;
    }
    // Future payment logic here
    alert('Procesando pago...');
  };

  if (!items || items.length === 0) {
    return <p className="container py-4">Tu carrito está vacío.</p>;
  }

  return (
    <div className="container py-4">
      <Row className="g-3">
        <Col lg={8}>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th style={{ width: 120 }}>Precio</th>
                <th style={{ width: 170 }}>Cantidad</th>
                <th style={{ width: 140 }}>Total</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <Image src={it.img} alt={it.name} width={64} height={64} rounded />
                      <div>
                        <div className="fw-semibold">{it.name}</div>
                        <div className="text-muted small">Stock: {it.stock}</div>
                      </div>
                    </div>
                  </td>
                  <td>{CLP.format(it.precio)}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQty(it.id, it.qty - 1)}
                        disabled={it.qty <= 1}
                      >
                        -
                      </Button>
                      <Button variant="light" disabled style={{ minWidth: 56 }}>
                        {it.qty}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQty(it.id, it.qty + 1)}
                        disabled={it.qty >= (it.stock ?? Infinity)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td className="fw-bold">{CLP.format(it.precio * it.qty)}</td>
                  <td>
                    <Button variant="outline-danger" onClick={() => removeItem(it.id)}>
                      x
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="outline-danger" onClick={clearCart}>
            Vaciar carrito
          </Button>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen</Card.Title>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>{CLP.format(subtotal)}</strong>
              </div>
              <hr />
              <div className="d-grid">
                <Button variant="success" onClick={handleCheckout}>Proceder al pago</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
