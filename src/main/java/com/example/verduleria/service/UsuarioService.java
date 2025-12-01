package com.example.verduleria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.verduleria.model.Usuario;
import com.example.verduleria.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario updateUsuario(Long id, Usuario updatedUsuario) {
        Optional<Usuario> existingUsuarioOpt = usuarioRepository.findById(id);

        if (existingUsuarioOpt.isEmpty()) {
            return null;
        }

        Usuario existingUsuario = existingUsuarioOpt.get();

        // Update user fields
        existingUsuario.setFirstName(updatedUsuario.getFirstName());
        existingUsuario.setLastName(updatedUsuario.getLastName());
        existingUsuario.setEmail(updatedUsuario.getEmail());
        existingUsuario.setRole(updatedUsuario.getRole());

        // Only update password if provided
        if (updatedUsuario.getPassword() != null && !updatedUsuario.getPassword().isEmpty()) {
            existingUsuario.setPassword(updatedUsuario.getPassword());
        }

        return usuarioRepository.save(existingUsuario);
    }

}
