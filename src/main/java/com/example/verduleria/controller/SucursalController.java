package com.example.verduleria.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.verduleria.model.Sucursal;
import com.example.verduleria.service.SucursalService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/sucursal")
@Tag(name = "Sucursal", description = "Operaciones sucursal")
public class SucursalController {

    @Autowired
    private SucursalService sucursalService;

    @GetMapping
    @Operation(summary = "Ver lista sucursales", 
    responses = {
        @ApiResponse(responseCode = "200", description = "Lista sucursales"),
        @ApiResponse(responseCode = "204", description = "No hay sucursales disponibles")
    })
    public ResponseEntity<List<Sucursal>> findAllSucursales() {
        List<Sucursal> sucursales = sucursalService.findAllSucursales();

        if (sucursales.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(sucursales, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Encontrar sucursal especifica",
    responses = {
        @ApiResponse(responseCode = "200", description = "Sucursal encontrado"),
        @ApiResponse(responseCode = "404", description = "Sucursal no encontrado")
    })
    public ResponseEntity<Sucursal> findSucursalById(
        @Parameter(description = "ID del sucursal")@PathVariable Long id
        ) {
        Optional<Sucursal> sucursalOpt = sucursalService.findSucursalById(id);

        if (sucursalOpt.isPresent()) {
            Sucursal sucursal = sucursalOpt.get();
            return new ResponseEntity<>(sucursal, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        
    }

    @PostMapping
    @Operation(summary = "Agregar sucursal")
    public ResponseEntity<Sucursal> addSucursal(
        @RequestBody @Parameter(description = "Cuerpo a agregar") Sucursal sucursal
        ) {
        sucursalService.saveSucursal(sucursal);
        return new ResponseEntity<>(sucursal, HttpStatus.CREATED);
        
    }

    @PutMapping("{id}")
    @Operation(summary = "Actualizar sucursal")
    public ResponseEntity<Sucursal> updateSucursal(
        @Parameter(description = "ID del sucursal")@PathVariable Long id,
        @RequestBody @Parameter(description = "Cuerpo actualizar") Sucursal updatedSucursal
        ) {

        Optional<Sucursal> existingSucursalOpt = sucursalService.findSucursalById(id);

        if (existingSucursalOpt.isPresent()) {
            Sucursal existingSucursal = existingSucursalOpt.get();

            Sucursal savedSucursal = sucursalService.saveSucursal(existingSucursal);
            return new ResponseEntity<>(savedSucursal, HttpStatus.OK);
            
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar sucursal")
    public ResponseEntity<?> deleteSucursal(
        @Parameter(description = "ID Sucursal") @PathVariable Long id
        ) {
        try {
            sucursalService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
