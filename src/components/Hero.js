import React from 'react';
import '../assets/styles/style.css';



const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-inner">
                <div className="hero-copy">
                    <h1>Frescura y calidad del campo a tu mesa</h1>
                    <p>
                        Frutas, verduras y productos orgánicos seleccionados. Envíos a múltiples
                        ciudades de Chile.
                    </p>
                    <a className="btn btn-primary" href="catalog/categories/fruits.html">
                        Ver catálogo
                    </a>
                </div>
                <div className="hero-media" role="img" aria-label="Productos frescos" />
            </div>
        </section>

    )
};

export default Hero;