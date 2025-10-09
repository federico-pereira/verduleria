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
  const [filteredProducts, setFilteredProducts] = useState(productos);

  useEffect(() => {
    const results = productos.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, productos]);

  
  return (
    <>
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
              <Link to={`/products/${product.id}`}>Ver detalles</Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Products;