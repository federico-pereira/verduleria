package com.example.verduleria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.verduleria.model.Producto;
import com.example.verduleria.repository.ProductoRepository;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> findProductoById(Long id) {
        return productoRepository.findById(id);
    }
    
    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public void deleteById(Long id) {
        productoRepository.deleteById(id);
    }

}
