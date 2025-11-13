package com.example.verduleria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable=false)
    private String nombre;

    @Column(nullable=false)
    private String descripcion;

    @Column(nullable=false)
    private double precio;

    @Column(nullable=false)
    private int stock;

    @Column(nullable=false)
    private String imageUrl;

    public Producto(String nombre, String descripcion, double precio, int stock, String imageUrl) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imageUrl = imageUrl;
    }
    
}
