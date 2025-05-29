import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  @Input() productos: Producto[] = [];
  
  @Output() idProductoEventEmitter = new EventEmitter();

  @Output() selectdProductoEventEmitter = new EventEmitter();

  onRemoveProducto(id: number): void {
    this.idProductoEventEmitter.emit(id);   
  }

  onSelectedProducto(producto: Producto): void {
    this.selectdProductoEventEmitter.emit(producto);
  }
}
