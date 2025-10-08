import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';


const Register = () => {
    return (
        <Container>
            <div className="login-container" id="register">
                <h2>Registro</h2>
                <form id="register-form">
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Nombre de usuario"
                        required=""
                    />
                    <label htmlFor="firstName">Nombre:</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        required=""
                    />
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        required=""
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required=""
                    />
                    <label htmlFor="start">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        defaultValue="2018-07-22"
                        required=""
                    /> <br/> <br/>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        required=""
                    />
                    <label htmlFor="repeatPassword">Repita Contraseña:</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        placeholder="Repita contraseña"
                        required=""
                    />
                    <input type="submit" defaultValue="Registrar" placeholder='Registrar'/>
                    <div id="result" />
                </form>
            </div>

        </Container>
    )
}

export default Register;