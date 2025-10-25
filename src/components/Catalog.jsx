import { productos } from '../data/Data';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Components
import SearchBar from './SearchBar';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productos);

  useEffect(() => {
    let results = productos;

    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const resetFilter = () => {
    setSelectedCategory('');
  };
  
  return (
    <>
      <section className='le-fix'>
        <Categories 
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
          resetFilter={resetFilter}
        />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Row xs={1} md={4} className="g-4">
        {filteredProducts.map((product, idx) => (
          <Col key={idx}>
            <Card className='card'>
              <Card.Img as={Image} fluid={true} src={product.img}/>
              <Card.Body className='card-body'>
                <Card.Title className='card-title'>{product.name}</Card.Title>
                <Card.Text>
                  {product.descripcion}
                </Card.Text>
              </Card.Body>
              <Button href={`/products/${product.id}`}>Ver detalles</Button>
            </Card>
          </Col>
        ))}
      </Row>
      </section>
    </>
  );
}

export default Products;