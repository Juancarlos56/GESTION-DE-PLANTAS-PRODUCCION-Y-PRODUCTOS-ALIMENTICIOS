import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Planta } from '../../../models/planta.model';

@Component({
  selector: 'app-planta',
  standalone: true,
  imports: [],
  templateUrl: './planta.component.html',
})
export class PlantaComponent {

  @Input() plantas: Planta[] = [];

  @Output() idPlantaEventEmitter = new EventEmitter();

  @Output() selectdPlantaEventEmitter = new EventEmitter();

  onRemovePlanta(id: number): void {
    this.idPlantaEventEmitter.emit(id);   
  }

  onSelectedPlanta(planta: Planta): void {
    this.selectdPlantaEventEmitter.emit(planta);
  }

}
