import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';

const Footing = () => {
    return (
        <Container>
            <footer className="site-footer">
                <div className="container footer-inner">
                    <small>© 2025 HuertoHogar · Sitio académico</small>
                    <small><a href="about/index.html#mapa">Tiendas y mapa</a></small>
                </div>
            </footer>
        </Container >
    )
};

export default Footing;