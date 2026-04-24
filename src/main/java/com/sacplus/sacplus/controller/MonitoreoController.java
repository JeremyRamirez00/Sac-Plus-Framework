package com.sacplus.sacplus.controller;

import com.sacplus.sacplus.model.Monitoreo;
import com.sacplus.sacplus.repository.MonitoreoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/monitoreo")
@CrossOrigin(origins = "*")
public class MonitoreoController {

    @Autowired
    private MonitoreoRepository repository;

    // CREAR
    @PostMapping
    public Monitoreo guardar(@RequestBody Monitoreo m) {
        return repository.save(m);
    }

    // LISTAR
    @GetMapping
    public List<Monitoreo> listar() {
        return repository.findAll();
    }

    // BUSCAR POR NOMBRE (QUERY PARAM)
    @GetMapping("/buscar")
    public List<Monitoreo> buscar(@RequestParam String nombre) {
        return repository.findByNombreContaining(nombre);
    }

    // OBTENER POR ID (MUY IMPORTANTE)
    @GetMapping("/{id}")
    public Monitoreo obtenerPorId(@PathVariable int id) {
        return repository.findById(id).orElse(null);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Monitoreo actualizar(@PathVariable int id, @RequestBody Monitoreo m) {
        m.setId(id);
        return repository.save(m);
    }

    // FINALIZAR
    @PutMapping("/{id}/finalizar")
    public Map<String, String> finalizar(@PathVariable int id) {

        Optional<Monitoreo> optional = repository.findById(id);
        Map<String, String> response = new HashMap<>();

        if (optional.isPresent()) {
            Monitoreo m = optional.get();
            m.setEstado("Finalizado");
            repository.save(m);
            response.put("mensaje", "Monitoreo finalizado correctamente");
        } else {
            response.put("error", "Monitoreo no encontrado");
        }

        return response;
    }
}