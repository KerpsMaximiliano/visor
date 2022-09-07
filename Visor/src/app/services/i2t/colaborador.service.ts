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
    { id: 1, nombre: 'Facundo', apellido: 'Ghio Serra', capacidad: 160, horasPlanificadas: 0 },
    { id: 2, nombre: 'Patricio', apellido: 'Macagno', capacidad: 160, horasPlanificadas: 0 },
    { id: 3, nombre: 'Gian', apellido: 'Laner', capacidad: 160, horasPlanificadas: 0 },
    { id: 4, nombre: 'Franco', apellido: 'Friggeri', capacidad: 160, horasPlanificadas: 0 },
    { id: 5, nombre: 'Franco', apellido: 'Corvalan', capacidad: 160, horasPlanificadas: 0 },
    { id: 6, nombre: 'Jeremias', apellido: 'Garcia', capacidad: 160, horasPlanificadas: 0 },
    { id: 7, nombre: 'Ignacio', apellido: 'Girod', capacidad: 80, horasPlanificadas: 0 },
    { id: 8, nombre: 'Fabio', apellido: 'Olivera', capacidad: 160, horasPlanificadas: 0 },
    { id: 9, nombre: 'Augusto', apellido: 'Escandon', capacidad: 160, horasPlanificadas: 0 },
    { id: 10, nombre: 'Federico', apellido: 'Gauchat', capacidad: 160, horasPlanificadas: 0 },
    { id: 11, nombre: 'Franco', apellido: 'Caldaroni', capacidad: 160, horasPlanificadas: 0 },
    { id: 12, nombre: 'Luciano', apellido: 'De Giorgio', capacidad: 80, horasPlanificadas: 0 },
    { id: 13, nombre: 'Lucio', apellido: 'Cocuccio', capacidad: 160, horasPlanificadas: 0 },
    { id: 14, nombre: 'Pablo', apellido: 'Corujo', capacidad: 160, horasPlanificadas: 0 },
    { id: 15, nombre: 'Leandro', apellido: 'Blodorn', capacidad: 160, horasPlanificadas: 0 },
    { id: 16, nombre: 'Maximiliano', apellido: 'Reichert', capacidad: 160, horasPlanificadas: 0 },
    { id: 17, nombre: 'Lucas', apellido: 'Rios', capacidad: 160, horasPlanificadas: 0 }

  ];

  planificacionHoras: any[] = [
    { id:1, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:2, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:3, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:4, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:5, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:6, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:7, septiembre: 50, octubre: 30, noviembre: 8, diciembre: 3 },
    { id:8, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:9, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:10, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:11, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:12, septiembre: 50, octubre: 30, noviembre: 8, diciembre: 3 },
    { id:13, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:14, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:15, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:16, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
    { id:17, septiembre: 100, octubre: 70, noviembre: 18, diciembre: 5 },
  ];
  
  getOrden() {
    return this.orden;
  }

  getColaboradores() {
    return this.colaboradores;
  }

  getHorasPlanificadas(id: number, diferenciaMes: number, inicio: number) {
    let horasTotales;
    switch (diferenciaMes) {
      case 0:
        return this.getHorasMes(id, inicio);
      case 1:
        horasTotales = this.getHorasMes(id, inicio);
        return horasTotales += this.getHorasMes(id, inicio+1);
      case 2:
        horasTotales = this.getHorasMes(id, inicio);
        horasTotales += this.getHorasMes(id, inicio+1);
        return horasTotales += this.getHorasMes(id, inicio+2);
      case 3:
        horasTotales = this.getHorasMes(id, inicio);
        horasTotales += this.getHorasMes(id, inicio+1);
        horasTotales += this.getHorasMes(id, inicio+2);
        return horasTotales += this.getHorasMes(id, inicio+3);
      case 4:
        horasTotales = this.getHorasMes(id, inicio);
        horasTotales += this.getHorasMes(id, inicio+1);
        horasTotales += this.getHorasMes(id, inicio+2);
        horasTotales += this.getHorasMes(id, inicio+3);
        return horasTotales += this.getHorasMes(id, inicio+4);
    }

  }

  getHorasMes(id: number, mesInicio: number) {
    switch (mesInicio) {
      case 1:
        return this.planificacionHoras[id].enero;
      case 2:
        return this.planificacionHoras[id].febrero;
      case 3:
        return this.planificacionHoras[id].marzo;
      case 4:
        return this.planificacionHoras[id].abril;
      case 5:
        return this.planificacionHoras[id].mayo;
      case 6:
        return this.planificacionHoras[id].junio;
      case 7:
        return this.planificacionHoras[id].julio;
      case 8:
        return this.planificacionHoras[id].agosto;
      case 9:
        return this.planificacionHoras[id].septiembre;
      case 10:
        return this.planificacionHoras[id].octubre;
      case 11:
        return this.planificacionHoras[id].noviembre;
      case 12:
        return this.planificacionHoras[id].diciembre;
    }
  }

  /* seleccionarMes(mes: number) {
    let mesInicio;
    switch (mes) {
      case 1:
        mesInicio = 'enero';
        break;
      case 2:
        mesInicio = 'febrero';
        break;
      case 3:
        mesInicio = 'marzo';
        break;
      case 4:
        mesInicio = 'abril';
        break;
      case 5:
        mesInicio = 'mayo';
        break;
      case 6:
        mesInicio = 'junio';
        break;
      case 7:
        mesInicio = 'julio';
        break;
      case 8:
        mesInicio = 'agosto';
        break;
      case 9:
        mesInicio = 'septiembre';
        break;
      case 10:
        mesInicio = 'octubre';
        break;
      case 11:
        mesInicio = 'noviembre';
        break;
      case 12:
        mesInicio = 'diciembre';
        break;
    }
    return mesInicio;
  } */

}