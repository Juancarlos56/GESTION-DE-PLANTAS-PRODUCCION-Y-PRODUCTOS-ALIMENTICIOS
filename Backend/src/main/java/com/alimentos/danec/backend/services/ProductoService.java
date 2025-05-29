package com.alimentos.danec.backend.services;

import com.alimentos.danec.backend.dto.ProductoDTO;
import com.alimentos.danec.backend.entities.Planta;
import com.alimentos.danec.backend.entities.Producto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ProductoService {
    public List<Producto> obtenerTodos();
    public List<Producto> obtenerPorPlanta(Long plantaId);
    public Optional<Producto> obtenerPorId(Long id);
    public Producto crear(Long plantaId, Producto producto);
    public Producto actualizar(Long id, ProductoDTO datos);
    public void eliminar(Long id);
}
