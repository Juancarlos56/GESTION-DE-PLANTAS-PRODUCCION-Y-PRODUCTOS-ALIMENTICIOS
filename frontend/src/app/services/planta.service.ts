import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { Planta } from '../models/planta.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PlantaService {

  private apiUrl = `${environment.apiUrl}/plantas`;
  //private http = inject(HttpClient);
  private plantas: Planta[] = [
      {
        "id": 1,
        "nombre": "Planta Norte",
        "ubicacion": "Quito, Ecuador"
      },
      {
        "id": 2,
        "nombre": "Planta Sur",
        "ubicacion": "Guayaquil, Ecuador"
      },
      {
        "id": 3,
        "nombre": "Planta Este",
        "ubicacion": "Cuenca, Ecuador"
      },
      {
        "id": 4,
        "nombre": "Planta Oeste",
        "ubicacion": "Loja, Ecuador"
      },
      {
        "id": 5,
        "nombre": "Planta Central",
        "ubicacion": "Ambato, Ecuador"
      }
  ]

  constructor(private http: HttpClient) {}

  getAll(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.apiUrl);
  }

  
  getById(id: number): Observable<Planta> {
    return this.http.get<Planta>(`${this.apiUrl}/${id}`);
  }

  create(planta: Planta): Observable<Planta> {
    console.log(planta)
    return this.http.post<Planta>(this.apiUrl, planta);
  }

  update(planta: Planta): Observable<Planta> {
    return this.http.put<Planta>(`${this.apiUrl}/${planta.id}`, planta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
