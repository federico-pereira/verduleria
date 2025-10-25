import { productos } from '../data/Data';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';


const HeroProduct = () => {
    
  return (

    <>
      <section className='le-fix'>
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
                <Button href={`/products/${product.id}`}>Ver detalles</Button>
            </Card>
          </Col>
        ))}
      </Row>
      </section>
    </>
  );
}
export default HeroProduct;