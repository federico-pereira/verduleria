import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

const Navigation = () => {
    return (
        <Container>
            <header class="site-header">
                <div class="container header-inner">
                    <a class="logo" href="/">
                        <img src={require('../assets/img/logo.jpg')} alt="HuertoHogar" />
                        <span>HuertoHogar</span>
                    </a>
                    <nav class="nav">
                        <Dropdown>
                        <Dropdown.Toggle variant='success' id='dropdown-basic'>
                            Catálogo
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href='/'>Frutas Frescas</Dropdown.Item>
                            <Dropdown.Item href='/'>Verduras Orgánicas</Dropdown.Item>
                            <Dropdown.Item href='/'>Productos Orgánicos</Dropdown.Item>
                            <Dropdown.Item href='/'>Productos Lácteos</Dropdown.Item>
                        </Dropdown.Menu>
                       </Dropdown>

                        <a href="/about">Nosotros</a>
                        <a href="/login">Ingresar</a>
                        <a href="cart/index.html">Carrito</a>
                    </nav>
                </div>
            </header>
        </Container>
    );
};

export default Navigation;