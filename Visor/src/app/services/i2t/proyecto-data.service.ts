import { Injectable } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoDataService {

  proyectos: Proyecto[];

  constructor() { 
    this.proyectos = [
    {
      nombre: "Chavarini",
      tareasATiempo: 6,
      tareasAtrasadas: 10
    },
    {
      nombre: "Extractos",
      tareasATiempo: 2,
      tareasAtrasadas: 11
    }
  ]
  }
}
