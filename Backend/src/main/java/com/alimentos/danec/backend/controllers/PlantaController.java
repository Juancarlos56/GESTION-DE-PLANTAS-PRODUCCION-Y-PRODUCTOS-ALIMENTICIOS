package com.alimentos.danec.backend.controllers;

import com.alimentos.danec.backend.dto.PlantaDTO;
import com.alimentos.danec.backend.entities.Planta;
import com.alimentos.danec.backend.services.PlantaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/plantas")
@CrossOrigin(origins = "http://localhost:4200")
public class PlantaController {

    private final PlantaService plantaService;

    public PlantaController(PlantaService plantaService) {
        this.plantaService = plantaService;
    }

    @GetMapping
    public List<PlantaDTO> listar() {
        return plantaService.obtenerTodas().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantaDTO> obtener(@PathVariable Long id) {
        return plantaService.obtenerPorId(id)
                .map(planta -> ResponseEntity.ok(toDTO(planta)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PlantaDTO> crear(@RequestBody @Valid PlantaDTO dto) {
        Planta creada = plantaService.crear(toEntity(dto));
        return ResponseEntity.ok(toDTO(creada));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantaDTO> actualizar(@PathVariable Long id, @RequestBody @Valid PlantaDTO dto) {
        Optional<Planta> plantaOptional = plantaService.obtenerPorId(id);
        if (plantaOptional.isPresent()) {
            Planta actualizada = plantaService.actualizar(id, toEntity(dto));
            return ResponseEntity.ok(toDTO(actualizada));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Planta> plantaOptional = plantaService.obtenerPorId(id);
        if (plantaOptional.isPresent()) {
            plantaService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private PlantaDTO toDTO(Planta p) {
        PlantaDTO dto = new PlantaDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setUbicacion(p.getUbicacion());
        return dto;
    }

    private Planta toEntity(PlantaDTO dto) {
        Planta p = new Planta();
        p.setNombre(dto.getNombre());
        p.setUbicacion(dto.getUbicacion());
        return p;
    }
}
