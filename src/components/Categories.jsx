import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const Categories = ({ onCategorySelect, selectedCategory, resetFilter }) => {
  const handleCategorySelect = (category) => {
    if (category === selectedCategory) {
      resetFilter();  // Reset filter if category is selected again
    } else {
      onCategorySelect(category);
    }
  };

  return (
    <Container>
      <section className="container section">
        <header className="section-header">
          <h2>Categorías</h2>
        </header>
        <div className="chip-row">
          <a 
            href="#all" 
            className={`chip ${!selectedCategory ? 'active' : ''}`}
            onClick={() => resetFilter()}
          >
            Todos
          </a>
          <a 
            href="#fruits" 
            className={`chip ${selectedCategory === 'fruits' ? 'active' : ''}`}
            onClick={() => handleCategorySelect('fruits')}
          >
            Frutas Frescas
          </a>
          <a 
            href="#vegetables" 
            className={`chip ${selectedCategory === 'vegetables' ? 'active' : ''}`}
            onClick={() => handleCategorySelect('vegetables')}
          >
            Verduras Orgánicas
          </a>
        </div>
      </section>
    </Container>
  );
};

export default Categories;
