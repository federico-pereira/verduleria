import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function ProductSearchBar({ products, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    onSearch(searchTerm); // Pass the search term to a parent component or handle filtering here
  };

  return (
    <Form className="d-flex" onSubmit={handleSearchSubmit}>
      <FormControl
        type="search"
        placeholder="Search for products..."
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button variant="outline-success" type="submit">Search</Button>
    </Form>
  );
}

export default ProductSearchBar;