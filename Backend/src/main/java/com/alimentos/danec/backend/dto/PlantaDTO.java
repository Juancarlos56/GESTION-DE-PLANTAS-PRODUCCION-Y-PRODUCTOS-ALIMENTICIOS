package com.alimentos.danec.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PlantaDTO {
    private Long id;

    @NotBlank(message = "El nombre de la planta es obligatorio")
    @Size(max = 100, message = "El nombre de la planta no debe exceder 100 caracteres")
    private String nombre;

    @Size(max = 200, message = "La ubicación no debe exceder 200 caracteres")
    private String ubicacion;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
}
