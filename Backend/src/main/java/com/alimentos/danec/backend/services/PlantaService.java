package com.alimentos.danec.backend.services;

import com.alimentos.danec.backend.entities.Planta;
import java.util.List;
import java.util.Optional;

public interface PlantaService {

    public List<Planta> obtenerTodas();
    public Optional<Planta> obtenerPorId(Long id);
    public Planta crear(Planta planta);
    public Planta actualizar(Long id, Planta nuevaPlanta);
    public void eliminar(Long id);

}
