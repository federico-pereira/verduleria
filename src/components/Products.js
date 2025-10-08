import { productos } from '../data/Data';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

// Components
import ProductSearchBar from './ProductSearchBar';



function Products() {

  const [filteredProducts, setFilteredProducts] = useState(productos);

  const handleProductSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const results = productos.filter(product =>
      product.name.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredProducts(results);
  };

  return (
    <>
      <ProductSearchBar onSearch={handleProductSearch} />
      <Row xs={1} md={4} className="g-4">
        {productos.map((product, idx) => (
          <Col key={idx}>
            <Card className='card'>
              <Card.Img as={Image} fluid={true} src={product.img}/>
              <Card.Body className='card-body'>
                <Card.Title className='card-title'>{product.name}</Card.Title>
                <Card.Text>
                  {product.descripcion}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Products;