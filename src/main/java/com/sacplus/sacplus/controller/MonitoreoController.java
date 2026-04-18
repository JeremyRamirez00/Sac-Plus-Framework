package com.sacplus.sacplus.controller;

import com.sacplus.sacplus.model.Monitoreo;
import com.sacplus.sacplus.repository.MonitoreoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/monitoreo")
@CrossOrigin(origins = "*")
public class MonitoreoController {

    @Autowired
    private MonitoreoRepository repository;

    // GUARDAR
    @PostMapping("/guardar")
    public Monitoreo guardar(@RequestBody Monitoreo m) {
        return repository.save(m);
    }

    // LISTAR
    @GetMapping("/listar")
    public List<Monitoreo> listar() {
        return repository.findAll();
    }

    // BUSCAR
    @GetMapping("/buscar/{nombre}")
    public List<Monitoreo> buscar(@PathVariable String nombre) {
        return repository.findByNombreContaining(nombre);
    }

    // ACTUALIZAR
    @PutMapping("/actualizar/{id}")
    public Monitoreo actualizar(@PathVariable int id, @RequestBody Monitoreo m) {
        m.setId(id);
        return repository.save(m);
    }

    // FINALIZAZR
    @PutMapping("/finalizar/{id}")
    public Monitoreo finalizar(@PathVariable int id) {
        Monitoreo m = repository.findById(id).orElse(null);
        if (m != null) {
            m.setEstado("Finalizado");
            return repository.save(m);
        }
        return null;
    }
}