import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';
import { useNavigate } from 'react-router-dom';

import { XSSCheck, validateLogin } from '../assets/scripts/loginValidation';

const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const sanitizedUsername = XSSCheck(username);
        const sanitizedPassword = XSSCheck(password);

        const validationResult = validateLogin(sanitizedUsername, sanitizedPassword);

        if (validationResult.isValid) {
            setSuccessMessage(validationResult.message);
            setTimeout(() => {
               navigate(('/'));
            }, 5000);
        } else {
            setErrorMessage(validationResult.message);
        }
    };



    return (
        <Container>
            <div className="login-container">
                <h2>Login</h2>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <a href="/register">¿No tiene cuenta? Registrar</a>
                    <input type="submit" defaultValue="Login" placeholder='Login' />
                    {errorMessage && <div id="result" style={{ color: 'red' }}>{errorMessage}</div>}
                    {successMessage && <div id="result" style={{ color: 'green' }}>{successMessage}</div>}
                </form>
            </div>
        </Container>
    )
}

export default Login;