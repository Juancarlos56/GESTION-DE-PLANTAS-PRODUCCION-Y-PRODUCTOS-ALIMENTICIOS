import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Planta } from '../../../models/planta.model';
//import { PlantaService } from '../../../services/planta.service';
import Swal from 'sweetalert2';
import { PlantaService } from '../../../services/planta.service';
import { PlantaComponent } from '../planta/planta.component';
import { FormPlantasComponent } from '../form-plantas/form-plantas.component';

@Component({
  selector: 'app-lista-plantas',
  standalone: true,
  imports: [PlantaComponent, FormPlantasComponent],
  templateUrl: './lista-plantas.component.html',
  styleUrl: './lista-plantas.component.css'
})
export class ListaPlantasComponent implements OnInit{
  title: string = 'Listado de Plantas';
  plantaSelected: Planta;
  open: boolean = false;
  plantas: Planta[] = [];
  loading: boolean = true;

  constructor(private plantaService: PlantaService) {
      this.plantaSelected = new Planta();
  }

  ngOnInit(): void {
    this.plantaService.getAll().subscribe({
      next: (data: any) => {
        this.plantas = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al obtener plantas:', err);
        this.loading = false;
      }
    });
  }

   addPlanta(planta: Planta) {
    if (planta.id > 0) {
      this.plantas = this.plantas.map(u => (u.id == planta.id) ? { ...planta } : u);
    } else {
      this.plantas = [... this.plantas, { ...planta, id: new Date().getTime() }];
    }
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado con exito!",
      icon: "success"
    });
    this.plantaSelected = new Planta();
    this.setOpen();
  }

  removePlanta(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado la planta sera eliminado del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.plantas = this.plantas.filter(planta => planta.id != id);
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado con exito.",
          icon: "success"
        });
      }
    });
    
  }

  setSelectedPlanta(plantaRow: Planta): void {
    this.plantaSelected = { ...plantaRow };
    this.open = true;
  }

  setOpen() {
    this.open = !this.open;
  }

}
