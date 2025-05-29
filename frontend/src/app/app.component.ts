import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaPlantasComponent } from './components/planta/lista-plantas/lista-plantas.component';
import { ListaProductosComponent } from './components/producto/lista-productos/lista-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaPlantasComponent, ListaProductosComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
