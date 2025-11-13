package com.example.verduleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.verduleria.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

}