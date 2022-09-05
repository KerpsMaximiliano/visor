import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  orden: any[] = [
    { id: 1, nombre: 'Alfabético' },
    { id: 2, nombre: 'Tiempo Disponible' }
  ];
  
  getOrden() {
    return this.orden;
  }

}