import { Component, OnInit } from '@angular/core';
import { FormProductosComponent } from '../form-productos/form-productos.component';
import { ProductoComponent } from '../producto/producto.component';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [FormProductosComponent, ProductoComponent, CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit{
  title: string = 'Listado de Productos';
  productoSelected: Producto;
  open: boolean = false;
  productos: Producto[] = [];
  loading: boolean = true;
  resumenPorPlanta: { [nombrePlanta: string]: number } = {};
  objectKeys = Object.keys;

  constructor(private productoService: ProductoService) {
      this.productoSelected = new Producto();
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.productoService.getAll().subscribe({
          next: (data: any) => {
            this.productos = data;
            this.loading = false;
            this.actualizarResumenPorPlanta();
          },
          error: (err: any) => {
            console.error('Error al obtener productos:', err);
            this.loading = false;
          }
    });
  }

   addProducto(producto: Producto) {
    if (producto.id > 0) {
      this.productoService.update(producto).subscribe({
        next: (productoUpdated) => {
          this.productos = this.productos.map(u =>
            u.id === productoUpdated.id ? { ...productoUpdated } : u
          );

          Swal.fire({
            title: 'Actualizado!',
            text: 'Producto actualizado con éxito!',
            icon: 'success'
          });
          this.actualizarResumenPorPlanta();
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);

          Swal.fire({
            title: 'Error!',
            text: err?.error?.message || 'No se pudo actualizar el producto. No se encontro el id de la planta',
            icon: 'error'
          });
        }
      });
    } else {
      console.log(producto);
      
      this.productoService.create(producto).subscribe({
        next: (productoCreated) => {
          this.productos = [...this.productos, { ...productoCreated }];
          
          Swal.fire({
            title: "Guardado!",
            text: "Producto guardado con éxito!",
            icon: "success"
          });
          this.actualizarResumenPorPlanta();
        },
        error: (err) => {
          console.error('Error al guardar producto:', err);

          Swal.fire({
            title: "Error!",
            text: err?.error?.message || "No se pudo guardar el producto. No se encontro el id de la planta",
            icon: "error"
          });
        }
      });
    }
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
        this.productoService.delete(id).subscribe(()=>{
          this.productos = this.productos.filter(producto => producto.id != id);
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
          this.actualizarResumenPorPlanta();
        })
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

  actualizarResumenPorPlanta() {
    this.resumenPorPlanta = {};
    console.log("Resumen> " , this.productos);
    
    for (const producto of this.productos) {
      const nombrePlanta = producto.plantaNombre || 'Sin Planta';
      this.resumenPorPlanta[nombrePlanta] = (this.resumenPorPlanta[nombrePlanta] || 0) + 1;
    }
    console.log("resumenPorPlanta> " , this.resumenPorPlanta);
}

} 
