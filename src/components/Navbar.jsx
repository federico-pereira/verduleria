import React from 'react';
import { Container, Dropdown, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <Container>
      <header className="site-header">
        <div className="container header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link className="logo" to="/">
            <img src={require('../assets/img/logo.jpg')} alt="HuertoHogar" />
            <span>HuertoHogar</span>
          </Link>

          <nav className="nav" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Catálogo
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/">Frutas Frescas</Dropdown.Item>
                <Dropdown.Item as={Link} to="/">Verduras Orgánicas</Dropdown.Item>
                <Dropdown.Item as={Link} to="/">Productos Orgánicos</Dropdown.Item>
                <Dropdown.Item as={Link} to="/">Productos Lácteos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}

            <Link to="/about">Nosotros</Link>

            {!user ? (
              <Link to="/login">Ingresar</Link>
            ) : (
              <>
                <span className="text-muted">{user.username}</span>
                <Button variant="outline-secondary" size="sm" onClick={logout}>
                  Salir
                </Button>
              </>
            )}

            <Link to="/cart" className="position-relative">
              Carrito{' '}
              {count > 0 && (
                <Badge bg="danger" pill className="position-absolute translate-middle" style={{ top: 0, right: -12 }}>
                  {count}
                </Badge>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </Container>
  );
}
