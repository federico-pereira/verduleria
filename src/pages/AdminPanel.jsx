import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function AdminPanel() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Check if user is admin
    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'ADMIN') {
        return null;
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4">Panel de Administración</h2>
            <p className="text-muted mb-4">Selecciona una opción para gestionar:</p>

            <Row className="g-4">
                <Col md={6}>
                    <Card as={Link} to="/admin/users" className="h-100 text-decoration-none" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <Card.Body className="text-center p-5">
                            <div className="mb-3">
                                <img src={require('../assets/img/users.png')} alt="Users" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                            </div>
                            <Card.Title className="h3 text-success">Gestión de Usuarios</Card.Title>
                            <Card.Text className="text-muted">
                                Administrar usuarios del sistema: crear, editar, eliminar y asignar roles
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card as={Link} to="/admin/products" className="h-100 text-decoration-none" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <Card.Body className="text-center p-5">
                            <div className="mb-3">
                                <img src={require('../assets/img/products.jpg')} alt="Products" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                            </div>
                            <Card.Title className="h3 text-success">Gestión de Productos</Card.Title>
                            <Card.Text className="text-muted">
                                Administrar catálogo de productos: crear, editar, eliminar y actualizar stock
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
