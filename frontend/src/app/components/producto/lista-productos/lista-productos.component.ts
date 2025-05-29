import { Component, OnInit } from '@angular/core';
import { FormProductosComponent } from '../form-productos/form-productos.component';
import { ProductoComponent } from '../producto/producto.component';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [FormProductosComponent, ProductoComponent],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit{
  title: string = 'Listado de Productos';
  productoSelected: Producto;
  open: boolean = false;
  productos: Producto[] = [];
  loading: boolean = true;

  constructor(private productoService: ProductoService) {
      this.productoSelected = new Producto();
  }

  ngOnInit(): void {
    this.productoService.getAll().subscribe({
      next: (data: any) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al obtener productos:', err);
        this.loading = false;
      }
    });
  }

   addProducto(producto: Producto) {
    if (producto.id > 0) {
      this.productos = this.productos.map(u => (u.id == producto.id) ? { ...producto } : u);
    } else {
      this.productos = [... this.productos, { ...producto, id: new Date().getTime() }];
    }
    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado con exito!",
      icon: "success"
    });
    this.productoSelected = new Producto();
    this.setOpen();
  }

  removeProducto(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado la producto sera eliminado del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.productos = this.productos.filter(producto => producto.id != id);
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado con exito.",
          icon: "success"
        });
      }
    });
    
  }

  setSelectedProducto(productoRow: Producto): void {
    this.productoSelected = { ...productoRow };
    this.open = true;
  }

  setOpen() {
    this.open = !this.open;
  }

}
