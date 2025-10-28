import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { XSSCheck, validateRegistration } from '../assets/scripts/registerValidation';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
    repeatPassword: '',
  });
  const [resultMessage, setResultMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sanitizedData = {
      username: XSSCheck(formData.username),
      firstName: XSSCheck(formData.firstName),
      lastName: XSSCheck(formData.lastName),
      email: XSSCheck(formData.email),
      dob: new Date(formData.dob),
      password: XSSCheck(formData.password),
      repeatPassword: XSSCheck(formData.repeatPassword),
    };

    const validationResult = validateRegistration(
      sanitizedData.username,
      sanitizedData.firstName,
      sanitizedData.lastName,
      sanitizedData.email,
      sanitizedData.dob,
      sanitizedData.password,
      sanitizedData.repeatPassword
    );

    setResultMessage(validationResult.message);

    if (validationResult.isValid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({
        username: sanitizedData.username,
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        email: sanitizedData.email,
        dob: sanitizedData.dob,
        password: sanitizedData.password,
      });
      localStorage.setItem('users', JSON.stringify(users));

      setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <Card>
        <Card.Body>
          <Card.Title>Registro</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="usuario@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Repite Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="repeatPassword"
                placeholder="Repita contraseña"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {resultMessage && (
              <div
                className="mb-3 text-center"
                style={{
                  color: resultMessage.includes('Confirmado') ? 'green' : 'red',
                }}
              >
                {resultMessage}
              </div>
            )}

            <Button type="submit" variant="success" className="w-100">
              Registrar
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <Link to="/login" className="link">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
