package com.alimentos.danec.backend.repositories;

import com.alimentos.danec.backend.entities.Planta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantaRepository extends JpaRepository<Planta, Long> {


}
