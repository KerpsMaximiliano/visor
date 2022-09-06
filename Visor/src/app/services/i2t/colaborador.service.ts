import { Injectable } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  orden: any[] = [
    { id: 1, nombre: 'Alfabético' },
    { id: 2, nombre: 'Tiempo Disponible' }
  ];

  colaboradores: Colaborador[] = [
    { id: 1, nombre: 'Facundo', apellido: 'Ghio Serra' },
    { id: 2, nombre: 'Patricio', apellido: 'Macagno' },
    { id: 3, nombre: 'Gian', apellido: 'Laner' },
    { id: 4, nombre: 'Franco', apellido: 'Friggeri' },
    { id: 5, nombre: 'Franco', apellido: 'Corvalan' },
    { id: 6, nombre: 'Jeremias', apellido: 'Garcia' },
    { id: 7, nombre: 'Ignacio', apellido: 'Girod' },
    { id: 8, nombre: 'Fabio', apellido: 'Olivera' },
    { id: 9, nombre: 'Augusto', apellido: 'Escandon' },
    { id: 10, nombre: 'Federico', apellido: 'Gauchat' },
    { id: 11, nombre: 'Franco', apellido: 'Caldaroni' },
    { id: 12, nombre: 'Luciano', apellido: 'De Giorgio' },
    { id: 13, nombre: 'Lucio', apellido: 'Cocuccio' },
    { id: 14, nombre: 'Pablo', apellido: 'Corujo' },
    { id: 15, nombre: 'Leandro', apellido: 'Blodorn' },
    { id: 16, nombre: 'Maximiliano', apellido: 'Reichert' },
    { id: 17, nombre: 'Lucas', apellido: 'Rios' }

  ]
  
  getOrden() {
    return this.orden;
  }

  getColaboradores() {
    return this.colaboradores;
  }

}