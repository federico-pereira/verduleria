package com.example.verduleria.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.verduleria.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUserName(String username);
}
