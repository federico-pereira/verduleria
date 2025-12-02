import React, { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <Card>
        <Card.Body>
          <Card.Title>Ingresar</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100" disabled={loading}>
              {loading ? 'Ingresando...' : 'Entrar'}
            </Button>
          </Form>
          <Link to='/register' className='link'>¿No tienes cuenta? Registrate</Link>
        </Card.Body>
      </Card>
    </div>
  );
}
