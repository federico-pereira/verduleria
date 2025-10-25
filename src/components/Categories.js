// src/components/Categories.js
import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { productos } from '../data/Data';

export default function Categories({ selected = 'todas', onSelect }) {
  const categories = useMemo(
    () => ['todas', ...new Set(productos.map((p) => p.category || 'Otros'))],
    []
  );

  return (
    <Container>
      <section className="container section">
        <header className="section-header">
          <h2>Categorías</h2>
        </header>
        <div className="chip-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map((c) => {
            const active = selected.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                onClick={() => onSelect?.(c)}
                className="chip btn btn-sm"
                style={{
                  borderRadius: 9999,
                  padding: '6px 12px',
                  border: active ? '1px solid #198754' : '1px solid #ccc',
                  background: active ? '#198754' : 'transparent',
                  color: active ? '#fff' : '#333',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
