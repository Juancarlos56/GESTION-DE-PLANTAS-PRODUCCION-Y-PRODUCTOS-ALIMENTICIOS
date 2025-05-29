package com.alimentos.danec.backend.services;

import com.alimentos.danec.backend.entities.Planta;
import com.alimentos.danec.backend.repositories.PlantaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlantaServiceImp implements PlantaService {

    private final PlantaRepository plantaRepository;

    public PlantaServiceImp(PlantaRepository plantaRepository) {
        this.plantaRepository = plantaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Planta> obtenerTodas() {
        return this.plantaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Planta> obtenerPorId(Long id) {
        return this.plantaRepository.findById(id);
    }

    @Override
    @Transactional
    public Planta crear(Planta planta) {
        return this.plantaRepository.save(planta);
    }

    @Override
    @Transactional
    public Planta actualizar(Long id, Planta nuevaPlanta) {
        return this.plantaRepository.findById(id)
                .map(p -> {
                    p.setNombre(nuevaPlanta.getNombre());
                    p.setUbicacion(nuevaPlanta.getUbicacion());
                    return this.plantaRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Planta no encontrada con ID: " + id));
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        this.plantaRepository.deleteById(id);
    }
}
