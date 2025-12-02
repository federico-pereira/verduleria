package com.example.verduleria.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.verduleria.model.Usuario;
import com.example.verduleria.repository.UsuarioRepository;
import com.example.verduleria.utils.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/auth")
@Tag(name="Manejo de Auth controller", description="Manejo de login y autenticacion cintinua de API sesion")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @Operation(summary = "API de autenticación login", responses = {
            @ApiResponse(responseCode = "200", description = "Login exitoso"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta o sintaxis invalida"),
            @ApiResponse(responseCode = "401", description = "No autorizado o credenciales invalidas"),
            @ApiResponse(responseCode = "404", description = "Recurso solicitado no encontrado"),
            @ApiResponse(responseCode = "405", description = "Metodo no permitido"),
            @ApiResponse(responseCode = "503", description = "Servicio no disponible")
    })
    public Map<String, String> login(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        Usuario u = usuarioRepository.findByUserName(username).get();

        String token = jwtUtil.generateToken(u.getUserName(), u.getRole().getName());

        return Map.of("token", token);
    }

    @GetMapping("/me")
    @Operation(summary = "API de autenticación login", responses = {
        @ApiResponse(responseCode = "200", description = "Autenticado"),
        @ApiResponse(responseCode = "400", description = "Solicitud incorrecta o sintaxis invalida"),
        @ApiResponse(responseCode = "401", description = "No autorizado o credenciales invalidas"),
        @ApiResponse(responseCode = "403", description = "Acceso no permitido")
    })
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {

        Usuario user = usuarioRepository.findByUserName(authentication.getName())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        Map<String, Object> data = new HashMap<>();
        data.put("id", user.getId());
        data.put("username", user.getUserName());
        data.put("firstName", user.getFirstName());
        data.put("lastName", user.getLastName());
        data.put("email", user.getEmail());
        data.put("role", user.getRole() != null ? user.getRole().getName() : null);

        return ResponseEntity.ok(data);
    }

}
