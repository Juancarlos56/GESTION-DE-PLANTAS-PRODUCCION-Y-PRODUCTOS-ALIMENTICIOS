import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() plantaRefresh= new EventEmitter<number>();

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
      this.plantaService.update(planta).subscribe({
        next: (plantaUpdated) => {
          this.plantas = this.plantas.map(p =>
            p.id === plantaUpdated.id ? { ...plantaUpdated } : p
          );

          Swal.fire({
            title: 'Actualizado!',
            text: 'Planta actualizada con éxito!',
            icon: 'success'
          });
          this.plantaRefresh.emit(plantaUpdated.id);
        },
        error: (err) => {
          console.error('Error al actualizar planta:', err);

          Swal.fire({
            title: 'Error!',
            text: err?.error?.message || 'No se pudo actualizar la planta.',
            icon: 'error'
          });
        }
      });
    } else {
      this.plantaService.create(planta).subscribe({
        next: (plantaNew) => {
          this.plantas = [...this.plantas, { ...plantaNew }];

          Swal.fire({
            title: 'Guardado!',
            text: 'Planta guardada con éxito!',
            icon: 'success'
          });
          this.plantaRefresh.emit(plantaNew.id);
        },
        error: (err) => {
          console.error('Error al guardar planta:', err);

          Swal.fire({
            title: 'Error!',
            text: err?.error?.message || 'No se pudo guardar la planta.',
            icon: 'error'
          });
        }
      });
    }
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
        this.plantaService.delete(id).subscribe(()=>{
          this.plantas = this.plantas.filter(planta => planta.id != id);
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
          this.plantaRefresh.emit(id);
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
