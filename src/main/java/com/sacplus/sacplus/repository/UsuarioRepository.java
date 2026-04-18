package com.sacplus.sacplus.repository;

import com.sacplus.sacplus.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsernameAndPassword(String username, String password);
}