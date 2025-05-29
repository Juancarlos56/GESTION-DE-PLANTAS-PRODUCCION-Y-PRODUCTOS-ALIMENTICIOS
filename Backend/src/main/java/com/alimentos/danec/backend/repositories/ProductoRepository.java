package com.alimentos.danec.backend.repositories;

import com.alimentos.danec.backend.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Listar productos por id de planta
    List<Producto> findByPlantaId(Long plantaId);
}
