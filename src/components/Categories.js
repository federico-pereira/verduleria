import React from 'react';
import { Container } from 'react-bootstrap';

const Categories = () => {
    return (
        <Container>
            <section className="container section">
                <header className="section-header">
                    <h2>Categorías</h2>
                </header>
                <div className="chip-row">
                    <a href="catalog/categories/fruits.html" className="chip">
                        Frutas Frescas
                    </a>
                    <a href="catalog/categories/vegetables.html" className="chip">
                        Verduras Orgánicas
                    </a>
                </div>
            </section>

        </Container>
    )
}

export default Categories;