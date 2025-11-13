package com.example.verduleria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.verduleria.model.Sucursal;
import com.example.verduleria.repository.SucursalRepository;

@Service
public class SucursalService {
    
    @Autowired
    private SucursalRepository sucursalRepository;

    public List<Sucursal> findAllSucursales() {
        return sucursalRepository.findAll();
    }

    public Optional<Sucursal> findSucursalById(Long id) {
        return sucursalRepository.findById(id);
    }
    
    public Sucursal saveSucursal(Sucursal sucursal) {
        return sucursalRepository.save(sucursal);
    }

    public void deleteById(Long id) {
        sucursalRepository.deleteById(id);
    }

}
