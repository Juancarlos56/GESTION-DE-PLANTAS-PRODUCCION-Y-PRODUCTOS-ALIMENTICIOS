import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms'
import { Producto } from '../../../models/producto.model';
import { PlantaService } from '../../../services/planta.service';
import { Planta } from '../../../models/planta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-productos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-productos.component.html',
  styleUrl: './form-productos.component.css'
})
export class FormProductosComponent  implements OnInit{

  @Input() producto: Producto;
  
  @Output() openEventEmitter = new EventEmitter();

  @Output() newPlantaEventEmitter: EventEmitter<Producto> = new EventEmitter();

  plantas: Planta[] = [];

  constructor(private plantaService: PlantaService) {
    this.producto = new Producto();
  }

  ngOnInit(): void {
    this.getPlantas();
  }
  
  getPlantas(){
    this.plantaService.getAll().subscribe({
      next: (data: any) => {
        this.plantas = data;
      },
      error: (err: any) => {
        console.error('Error al obtener plantas:', err);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.newPlantaEventEmitter.emit(this.producto);
      console.log(this.producto);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(plantaForm: NgForm): void {
    this.producto = new Producto();
    plantaForm.reset();
    plantaForm.resetForm();
  }

  onOpenClose() {
    this.openEventEmitter.emit();
  }
}
