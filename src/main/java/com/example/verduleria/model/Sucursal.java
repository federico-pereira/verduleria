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
@Table(name = "sucursal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sucursal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true, nullable=false)
    private String nombre_sucursal;

    @Column(nullable=true)
    private String descripcion_sucursal;

    public Sucursal(String nombre_sucursal, String descripcion_sucursal) {
        this.nombre_sucursal = nombre_sucursal;
        this.descripcion_sucursal = descripcion_sucursal;
    }

}
