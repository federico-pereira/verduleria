import React from 'react';
import { Footer, Container } from 'react-bootstrap';
import '../assets/styles/style.css';

const Footing = () => {
    return (
        <Container>
            <footer class="site-footer">
                <div class="container footer-inner">
                    <small>© 2025 HuertoHogar · Sitio académico</small>
                    <small><a href="about/index.html#mapa">Tiendas y mapa</a></small>
                </div>
            </footer>
        </Container >
    )
};

export default Footing;