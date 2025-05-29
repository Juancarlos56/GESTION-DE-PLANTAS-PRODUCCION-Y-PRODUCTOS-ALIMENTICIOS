package com.alimentos.danec.backend.services;

import com.alimentos.danec.backend.dto.ProductoDTO;
import com.alimentos.danec.backend.entities.Planta;
import com.alimentos.danec.backend.entities.Producto;
import com.alimentos.danec.backend.repositories.PlantaRepository;
import com.alimentos.danec.backend.repositories.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImp implements ProductoService{

    private final ProductoRepository productoRepository;
    private final PlantaRepository plantaRepository;

    public ProductoServiceImp(ProductoRepository productoRepository, PlantaRepository plantaRepository) {
        this.productoRepository = productoRepository;
        this.plantaRepository = plantaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> obtenerTodos() {
        return this.productoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> obtenerPorPlanta(Long plantaId) {
        return this.productoRepository.findByPlantaId(plantaId);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Producto> obtenerPorId(Long id) {
        return this.productoRepository.findById(id);
    }

    @Override
    @Transactional
    public Producto crear(Long plantaId, Producto producto) {
        Planta planta = this.plantaRepository.findById(plantaId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No se encontró la planta con ID: " + plantaId
                ));

        producto.setFechaRegistro(LocalDateTime.now());
        producto.setPlanta(planta);
        return this.productoRepository.save(producto);
    }

    @Transactional
    @Override
    public Producto actualizar(Long id, ProductoDTO datos) {
        Planta nuevaPlanta = plantaRepository.findById(datos.getPlantaId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No se encontró la planta con ID: " + datos.getPlantaId()
                ));

        return productoRepository.findById(id)
                .map(p -> {
                    p.setNombre(datos.getNombre());
                    p.setTipo(datos.getTipo());
                    p.setPlanta(nuevaPlanta);
                    return productoRepository.save(p);
                })
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No se encontró el producto con ID: " + id
                ));
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        this.productoRepository.deleteById(id);
    }
}
