package com.alimentos.danec.backend.controllers;

import com.alimentos.danec.backend.dto.ProductoDTO;
import com.alimentos.danec.backend.entities.Planta;
import com.alimentos.danec.backend.entities.Producto;
import com.alimentos.danec.backend.services.ProductoService;
import com.alimentos.danec.backend.services.ProductoServiceImp;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<ProductoDTO> listarTodos() {
        return productoService.obtenerTodos().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/planta/{plantaId}")
    public List<ProductoDTO> listarPorPlanta(@PathVariable Long plantaId) {
        return productoService.obtenerPorPlanta(plantaId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtener(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .map(producto -> ResponseEntity.ok(toDTO(producto)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody @Valid ProductoDTO dto) {
        Producto creado = productoService.crear(dto.getPlantaId(), toEntity(dto));
        return ResponseEntity.ok(toDTO(creado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(@PathVariable Long id, @RequestBody @Valid ProductoDTO dto) {
        Optional<Producto> productoOptional = productoService.obtenerPorId(id);
        if (productoOptional.isPresent()) {
            Producto actualizado = productoService.actualizar(id, toEntity(dto));
            return ResponseEntity.ok(toDTO(actualizado));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Producto> productoOptional = productoService.obtenerPorId(id);
        if (productoOptional.isPresent()) {
            productoService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private ProductoDTO toDTO(Producto p) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setTipo(p.getTipo());
        dto.setFechaRegistro(p.getFechaRegistro());
        dto.setPlantaId(p.getPlanta().getId());
        return dto;
    }

    private Producto toEntity(ProductoDTO dto) {
        Producto p = new Producto();
        p.setNombre(dto.getNombre());
        p.setTipo(dto.getTipo());
        return p;
    }
}
