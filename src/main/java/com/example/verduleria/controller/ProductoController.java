package com.example.verduleria.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.verduleria.model.Producto;
import com.example.verduleria.service.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/productos")
@Tag(name = "Producto", description = "Operaciones producto")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    @PreAuthorize("permitAll()")
    @Operation(summary = "Ver lista productos", responses = {
            @ApiResponse(responseCode = "200", description = "Lista productos"),
            @ApiResponse(responseCode = "204", description = "No hay productos disponibles")
    })
    public ResponseEntity<List<Producto>> findAllProductos() {
        List<Producto> productos = productoService.findAllProductos();

        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    @Operation(summary = "Encontrar producto especifico", responses = {
            @ApiResponse(responseCode = "200", description = "Producto encontrado"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    })
    public ResponseEntity<Producto> findProductoById(
            @Parameter(description = "ID del producto") @PathVariable Long id) {
        Optional<Producto> productoOpt = productoService.findProductoById(id);

        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            return new ResponseEntity<>(producto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Agregar producto")
    public ResponseEntity<Producto> addProducto(
            @RequestBody @Parameter(description = "Cuerpo a agregar") Producto producto) {
        productoService.saveProducto(producto);
        return new ResponseEntity<>(producto, HttpStatus.CREATED);

    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Actualizar producto")
    public ResponseEntity<Producto> updateProducto(
            @Parameter(description = "ID del producto") @PathVariable Long id,
            @RequestBody @Parameter(description = "Cuerpo actualizar") Producto updatedProducto) {

        Producto savedProducto = productoService.updateProducto(id, updatedProducto);

        if (savedProducto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(savedProducto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar producto")
    public ResponseEntity<?> deleteProducto(
            @Parameter(description = "ID Producto") @PathVariable Long id) {
        try {
            productoService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
