package com.example.verduleria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.verduleria.model.Sucursal;

public interface SucursalRepository extends JpaRepository<Sucursal, Long> {
    
}
