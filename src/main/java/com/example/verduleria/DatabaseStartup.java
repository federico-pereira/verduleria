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

        productoRepository.save(new Producto("Manzanas Fuji", "Manzanas frescas y crujientes.", 1200, 500, "Manzana1"));
        productoRepository.save(new Producto("Plátanos Cavendish", "Ricos en potasio; perfectos para snacks y desayunos.", 800, 100, "Platano1"));
        productoRepository.save(new Producto("Kiwi", "Rico en vitamina C, potasio y fibra.", 1500, 40, "Kiwi1"));
        productoRepository.save(new Producto("Mango", "Fuente de vitamina A, C y antioxidantes.", 1500, 50, "Mango1"));
        productoRepository.save(new Producto("Piña", "Perfecta para jugos, postres y ensaladas.", 1800, 40, "Pina1"));
        productoRepository.save(new Producto("Naranja Valencia", "Jugosa, ideal para zumos.", 1100, 120, "Naranja1"));
        productoRepository.save(new Producto("Uvas", "Dulces y frescas para colaciones.", 1600, 80, "Uva1"));
        productoRepository.save(new Producto("Frutillas", "Aromáticas y perfectas para postres.", 1700, 60, "Frutilla1"));
        productoRepository.save(new Producto("Espinaca", "Hojas verdes tiernas para ensaladas o salteados.", 900, 70, "Espinaca1"));
        productoRepository.save(new Producto("Pimientos", "Rojos y verdes, frescos para saltear o asar.", 1300, 90, "Pimiento1"));
        productoRepository.save(new Producto("Zanahoria", "Crocrante, ideal en sopas, ensaladas y jugos.", 850, 100, "Zanahoria1"));
    }
}
