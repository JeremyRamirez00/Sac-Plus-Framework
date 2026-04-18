package com.sacplus.sacplus.repository;

import com.sacplus.sacplus.model.Monitoreo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MonitoreoRepository extends JpaRepository<Monitoreo, Integer> {

    // Buscar por nombre
    List<Monitoreo> findByNombreContaining(String nombre);
}