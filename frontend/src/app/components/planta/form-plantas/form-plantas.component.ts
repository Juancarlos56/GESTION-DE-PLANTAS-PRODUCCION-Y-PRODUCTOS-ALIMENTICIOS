import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Planta } from '../../../models/planta.model';
import { FormsModule, NgForm} from '@angular/forms'

@Component({
  selector: 'app-form-plantas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-plantas.component.html',
  styleUrl: './form-plantas.component.css'
})
export class FormPlantasComponent {

  @Input() planta: Planta;

  @Output() openEventEmitter = new EventEmitter();

  @Output() newPlantaEventEmitter: EventEmitter<Planta> = new EventEmitter();

  constructor() {
    this.planta = new Planta();
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.newPlantaEventEmitter.emit(this.planta);
      console.log(this.planta);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(plantaForm: NgForm): void {
    this.planta = new Planta();
    plantaForm.reset();
    plantaForm.resetForm();
  }

  onOpenClose() {
    this.openEventEmitter.emit();
  }

}
