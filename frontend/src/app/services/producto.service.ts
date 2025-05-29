import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
//import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.apiUrl}/productos`;

   private productos: Producto[] = [
      {
        "id": 1,
        "nombre": "Producto A",
        "tipo": "Alimento",
        "fechaRegistro": "2024-05-01",
        "plantaId": 1
      },
      {
        "id": 2,
        "nombre": "Producto B",
        "tipo": "Bebida",
        "fechaRegistro": "2024-05-03",
        "plantaId": 1
      },
      {
        "id": 3,
        "nombre": "Producto C",
        "tipo": "Conserva",
        "fechaRegistro": "2024-05-05",
        "plantaId": 2
      },
      {
        "id": 4,
        "nombre": "Producto D",
        "tipo": "Snack",
        "fechaRegistro": "2024-05-06",
        "plantaId": 2
      },
      {
        "id": 5,
        "nombre": "Producto E",
        "tipo": "Alimento",
        "fechaRegistro": "2024-05-07",
        "plantaId": 3
      },
      {
        "id": 6,
        "nombre": "Producto F",
        "tipo": "Bebida",
        "fechaRegistro": "2024-05-08",
        "plantaId": 3
      },
      {
        "id": 7,
        "nombre": "Producto G",
        "tipo": "Conserva",
        "fechaRegistro": "2024-05-09",
        "plantaId": 4
      },
      {
        "id": 8,
        "nombre": "Producto H",
        "tipo": "Snack",
        "fechaRegistro": "2024-05-10",
        "plantaId": 4
      },
      {
        "id": 9,
        "nombre": "Producto I",
        "tipo": "Alimento",
        "fechaRegistro": "2024-05-11",
        "plantaId": 5
      },
      {
        "id": 10,
        "nombre": "Producto J",
        "tipo": "Bebida",
        "fechaRegistro": "2024-05-12",
        "plantaId": 5
      }
    ]

  
    constructor(/*private http: HttpClient*/) {}
  
    getAll(): Observable<Producto[]> {
      //return this.http.get<Planta[]>(this.apiUrl);
      return of(this.productos);
    }

  /*
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  getByPlanta(plantaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/planta/${plantaId}`);
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  update(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/
}
