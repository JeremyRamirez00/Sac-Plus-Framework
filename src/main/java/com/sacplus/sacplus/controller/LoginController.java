package com.sacplus.sacplus.controller;

import com.sacplus.sacplus.model.Usuario;
import com.sacplus.sacplus.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/login")
    public String login(@RequestBody Usuario user) {
        System.out.println("Entró al login"); //DEBUG
        Optional<Usuario> u = repository.findByUsernameAndPassword(
                user.getUsername(),
                user.getPassword()
        );
        if (u.isPresent()) {
            return "OK";
        } else {
            return "ERROR";
        }
    }
}

