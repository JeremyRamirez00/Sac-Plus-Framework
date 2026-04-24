package com.sacplus.sacplus.controller;

import com.sacplus.sacplus.model.Usuario;
import com.sacplus.sacplus.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Usuario user) {

        Optional<Usuario> u = repository.findByUsernameAndPassword(
                user.getUsername(),
                user.getPassword()
        );

        Map<String, String> response = new HashMap<>();

        if (u.isPresent()) {
            response.put("mensaje", "Login exitoso");
        } else {
            response.put("error", "Credenciales incorrectas");
        }

        return response;
    }
}
