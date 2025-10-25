import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';
import { useNavigate } from 'react-router-dom';

import { XSSCheck, validateRegistration } from '../assets/scripts/registerValidation';



const Register = () => {

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
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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

            setTimeout(() => {
                navigate(('/'));
            }, 5000);
        }
    };

    return (
        <Container>
            <div className="login-container" id="register">
                <h2>Registro</h2>
                <form id="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Nombre de usuario"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="firstName">Nombre:</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="start">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="birthday"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    /> <br/> <br/>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="repeatPassword">Repita Contraseña:</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        placeholder="Repita contraseña"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                    />
                    <input type="submit" defaultValue="Registrar" placeholder='Registrar'/>
                    {resultMessage && (
                        <div id="result" style={{ color: resultMessage.includes('Confirmado') ? 'green' : 'red' }}>
                            {resultMessage}
                        </div>
                    )}
                </form>
            </div>

        </Container>
    )
}

export default Register;