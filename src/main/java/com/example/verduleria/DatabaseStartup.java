package com.example.verduleria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.example.verduleria.model.Producto;
import com.example.verduleria.model.Sucursal;
import com.example.verduleria.model.Usuario;
import com.example.verduleria.repository.ProductoRepository;
import com.example.verduleria.repository.SucursalRepository;
import com.example.verduleria.repository.UsuarioRepository;

@Component
public class DatabaseStartup {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private ProductoRepository productoRepository;


    @EventListener(ApplicationReadyEvent.class)
    public void populateDatabase() {
        System.out.println("Agregando detalles");


        // Users
        usuarioRepository.save(new Usuario("User1", "Nombre1", "Apellido1", "Email1", null, "Contraseña 1"));
        usuarioRepository.save(new Usuario("User2", "Nombre2", "Apellido2", "Email2", null, "Contraseña 2"));
        usuarioRepository.save(new Usuario("User3", "Nombre3", "Apellido3", "Email3", null, "Contraseña 3"));
        usuarioRepository.save(new Usuario("User4", "Nombre4", "Apellido4", "Email4", null, "Contraseña 4"));
        usuarioRepository.save(new Usuario("User5", "Nombre5", "Apellido5", "Email5", null, "Contraseña 5"));
        usuarioRepository.save(new Usuario("User6", "Nombre6", "Apellido6", "Email6", null, "Contraseña 6"));


        //Sucursales
        sucursalRepository.save(new Sucursal("Nombre_suc1", "Desc_Suc1"));

        //Productos
        productoRepository.save(new Producto("Nombre_prod1", "Desc_prod1", 100, 100, "ImageURL_prod1"));
    }
}
