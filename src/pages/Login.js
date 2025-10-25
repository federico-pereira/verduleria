import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Login() {
  const { login } = useAuth();
  const { /* acceso para forzar carga/merge ya lo maneja CartProvider con efecto */ } = useCart();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await login({ email, name });
    nav('/');
  };

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <Card>
        <Card.Body>
          <Card.Title>Ingresar</Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre (opcional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
