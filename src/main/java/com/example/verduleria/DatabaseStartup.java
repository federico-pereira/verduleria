package com.example.verduleria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.verduleria.model.Producto;
import com.example.verduleria.model.Role;
import com.example.verduleria.model.Sucursal;
import com.example.verduleria.model.Usuario;
import com.example.verduleria.repository.*;

@Component
public class DatabaseStartup {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private SucursalRepository sucursalRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @org.springframework.context.event.EventListener(org.springframework.boot.context.event.ApplicationReadyEvent.class)
    public void populateDatabase() {

        System.out.println("Agregando detalles (sin duplicados)...");

        // ==========================
        // ROLES
        // ==========================
        if (roleRepository.findByName("ADMIN").isEmpty()) {
            roleRepository.save(new Role("ADMIN", "Administrador del sistema"));
        }
        if (roleRepository.findByName("USER").isEmpty()) {
            roleRepository.save(new Role("USER", "Usuario normal"));
        }

        Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
        Role userRole = roleRepository.findByName("USER").orElseThrow();

        // ==========================
        // USERS
        // ==========================
        saveUserIfNotExists("Admin", "admin", "master", "Email1", "Adminpasswd", adminRole);
        saveUserIfNotExists("User2", "Nombre2", "Apellido2", "Email2", "Userpasswd1", userRole);
        saveUserIfNotExists("User3", "Nombre3", "Apellido3", "Email3", "Userpasswd2", userRole);
        saveUserIfNotExists("User4", "Nombre4", "Apellido4", "Email4", "Userpasswd3", userRole);
        saveUserIfNotExists("User5", "Nombre5", "Apellido5", "Email5", "Userpasswd4", userRole);

        // ==========================
        // SUCURSALES
        // ==========================
        try {
            sucursalRepository.save(new Sucursal("Nombre_suc1", "Desc_Suc1"));
        } catch (Exception ignore) {
        }

        // ==========================
        // PRODUCTOS
        // ==========================
        saveProductoSafe(new Producto("Manzanas Fuji", "Manzanas frescas y crujientes.", 1200, 500, "Manzana1"));
        saveProductoSafe(new Producto("Plátanos Cavendish", "Ricos en potasio; perfectos para snacks y desayunos.", 800,
                100, "Platano1"));
        saveProductoSafe(new Producto("Kiwi", "Rico en vitamina C, potasio y fibra.", 1500, 40, "Kiwi1"));
        saveProductoSafe(new Producto("Mango", "Fuente de vitamina A, C y antioxidantes.", 1500, 50, "Mango1"));
        saveProductoSafe(new Producto("Piña", "Perfecta para jugos, postres y ensaladas.", 1800, 40, "Pina1"));
        saveProductoSafe(new Producto("Naranja Valencia", "Jugosa, ideal para zumos.", 1100, 120, "Naranja1"));
        saveProductoSafe(new Producto("Uvas", "Dulces y frescas para colaciones.", 1600, 80, "Uva1"));
        saveProductoSafe(new Producto("Frutillas", "Aromáticas y perfectas para postres.", 1700, 60, "Frutilla1"));
        saveProductoSafe(
                new Producto("Espinaca", "Hojas verdes tiernas para ensaladas o salteados.", 900, 70, "Espinaca1"));
        saveProductoSafe(
                new Producto("Pimientos", "Rojos y verdes, frescos para saltear o asar.", 1300, 90, "Pimiento1"));
        saveProductoSafe(
                new Producto("Zanahoria", "Crocrante, ideal en sopas, ensaladas y jugos.", 850, 100, "Zanahoria1"));
    }

    // ============== HELPERS ==============

    private void saveUserIfNotExists(String username, String first, String last, String email,
            String rawPassword, Role role) {
        if (usuarioRepository.findByUserName(username).isEmpty()) {
            usuarioRepository.save(
                    new Usuario(
                            username, first, last, email, null,
                            passwordEncoder.encode(rawPassword),
                            role));
        }
    }

    // No hay finder → usamos TRY-CATCH
    private void saveProductoSafe(Producto p) {
        try {
            productoRepository.save(p);
        } catch (Exception ignore) {
            // ya existe, ignoramos
        }
    }
}
