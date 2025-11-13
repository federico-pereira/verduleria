import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/ProductoService';


const ProductoList = () => {

    const [producto, setProducto] = useState([]);

    useEffect(() => {
    getProductos()
      .then((productos) => setData(productos))
      .catch((error) => console.error('There was an error fetching the productos:', error));
  }, []);

    return (
    <div className="container">
      <h1>My App</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductoList;