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

import com.example.verduleria.model.Usuario;
import com.example.verduleria.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/usuario")
@Tag(name = "Usuario", description = "Operaciones usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Ver lista usuarios", 
    responses = {
        @ApiResponse(responseCode = "200", description = "Lista usuarios"),
        @ApiResponse(responseCode = "204", description = "No hay usuarios disponibles")
    })
    public ResponseEntity<List<Usuario>> findAllUsuarios() {
        List<Usuario> usuarios = usuarioService.findAllUsuarios();

        if (usuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Encontrar usuario especifico",
    responses = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<Usuario> findUsuarioById(
        @Parameter(description = "ID del usuario")@PathVariable Long id
        ) {
        Optional<Usuario> usuarioOpt = usuarioService.findUsuarioById(id);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Agregar usuario")
    public ResponseEntity<Usuario> addUsuario(
        @RequestBody @Parameter(description = "Cuerpo a agregar") Usuario usuario
        ) {
        usuarioService.saveUsuario(usuario);
        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
        
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Actualizar usuario")
    public ResponseEntity<Usuario> updateUsuario(
        @Parameter(description = "ID del usuario")@PathVariable Long id,
        @RequestBody @Parameter(description = "Cuerpo actualizar") Usuario updatedUsuario
        ) {

        Optional<Usuario> existingUsuarioOpt = usuarioService.findUsuarioById(id);

        if (existingUsuarioOpt.isPresent()) {
            Usuario existingUsuario = existingUsuarioOpt.get();

            Usuario savedUsuario = usuarioService.saveUsuario(existingUsuario);
            return new ResponseEntity<>(savedUsuario, HttpStatus.OK);
            
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar usuario")
    public ResponseEntity<?> deleteUsuario(
        @Parameter(description = "ID Usuario") @PathVariable Long id
        ) {
        try {
            usuarioService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
