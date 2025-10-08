import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';


const Login = () => {
    return (
        <Container>
            <div className="login-container">
                <h2>Login</h2>
                <form id="loginForm">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        required=""
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required=""
                    />
                    <a href="/register">¿No tiene cuenta? Registrar</a>
                    <input type="submit" defaultValue="Login" placeholder='Login' />
                    <div id="result" />
                </form>
            </div>
        </Container>
    )
}

export default Login;