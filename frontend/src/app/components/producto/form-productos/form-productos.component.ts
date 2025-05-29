import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms'
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-form-productos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-productos.component.html',
  styleUrl: './form-productos.component.css'
})
export class FormProductosComponent {

  @Input() producto: Producto;
  
  @Output() openEventEmitter = new EventEmitter();

  @Output() newPlantaEventEmitter: EventEmitter<Producto> = new EventEmitter();

  constructor() {
    this.producto = new Producto();
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
