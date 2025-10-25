// src/components/ProductSearchBar.js
import React, { useEffect, useState } from 'react';

export default function ProductSearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  // Llamada con pequeño debounce
  useEffect(() => {
    const id = setTimeout(() => onSearch?.(value), 200);
    return () => clearTimeout(id);
  }, [value, onSearch]);

  return (
    <input
      className="form-control mb-3"
      type="search"
      placeholder="Buscar producto..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
