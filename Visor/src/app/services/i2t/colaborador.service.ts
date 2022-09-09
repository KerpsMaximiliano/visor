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
    { id: 1, nombre: 'Facundo', apellido: 'Ghio Serra', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 2, nombre: 'Patricio', apellido: 'Macagno', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 3, nombre: 'Gian', apellido: 'Laner', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 4, nombre: 'Franco', apellido: 'Friggeri', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 5, nombre: 'Franco', apellido: 'Corvalan', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 6, nombre: 'Jeremias', apellido: 'Garcia', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 7, nombre: 'Ignacio', apellido: 'Girod', capacidad: 80, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 8, nombre: 'Fabio', apellido: 'Olivera', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 9, nombre: 'Augusto', apellido: 'Escandon', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 10, nombre: 'Federico', apellido: 'Gauchat', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 11, nombre: 'Franco', apellido: 'Caldaroni', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 12, nombre: 'Luciano', apellido: 'De Giorgio', capacidad: 80, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 13, nombre: 'Lucio', apellido: 'Cocuccio', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 14, nombre: 'Pablo', apellido: 'Corujo', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 15, nombre: 'Leandro', apellido: 'Blodorn', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 16, nombre: 'Maximiliano', apellido: 'Reichert', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 },
    { id: 17, nombre: 'Lucas', apellido: 'Rios', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0 }

  ];

  planificacionHoras: any[] = [
    { id:1, septiembre: 130, octubre: 46, noviembre: 15, diciembre: 0 },
    { id:2, septiembre: 110, octubre: 50, noviembre: 8, diciembre: 0 },
    { id:3, septiembre: 120, octubre: 49, noviembre: 7, diciembre: 0 },
    { id:4, septiembre: 125, octubre: 45, noviembre: 19, diciembre: 0 },
    { id:5, septiembre: 121, octubre: 50, noviembre: 0, diciembre: 0 },
    { id:6, septiembre: 128, octubre: 45, noviembre: 0, diciembre: 0 },
    { id:7, septiembre: 60, octubre: 40, noviembre: 0, diciembre: 0 },
    { id:8, septiembre: 119, octubre: 45, noviembre: 0, diciembre: 0 },
    { id:9, septiembre: 112, octubre: 40, noviembre: 7, diciembre: 0 },
    { id:10, septiembre: 118, octubre: 34, noviembre: 8, diciembre: 0 },
    { id:11, septiembre: 119, octubre: 29, noviembre: 0, diciembre: 0 },
    { id:12, septiembre: 60, octubre: 10, noviembre: 6, diciembre: 0 },
    { id:13, septiembre: 121, octubre: 39, noviembre: 0, diciembre: 0 },
    { id:14, septiembre: 122, octubre: 37, noviembre: 15, diciembre: 0 },
    { id:15, septiembre: 125, octubre: 34, noviembre: 0, diciembre: 0 },
    { id:16, septiembre: 115, octubre: 38, noviembre: 18, diciembre: 0 },
    { id:17, septiembre: 120, octubre: 40, noviembre: 0, diciembre: 0 },
  ];

  tareas: any[] = [
    { idColab: 1, fechaPlanificacion: new Date(2022, 8, 5), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 1, fechaPlanificacion: new Date(2022, 8, 5), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 1, fechaPlanificacion: new Date(2022, 8, 9), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 2, fechaPlanificacion: new Date(2022, 8, 5), horasPlanificadas: 55, completada: false, proyecto: 'Proyecto A' },
    { idColab: 2, fechaPlanificacion: new Date(2022, 8, 5), horasPlanificadas: 37, completada: false, proyecto: 'Proyecto B' },
    { idColab: 2, fechaPlanificacion: new Date(2022, 8, 5), horasPlanificadas: 18, completada: false, proyecto: 'Proyecto C' },
    { idColab: 3, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 3, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 3, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 4, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 4, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 5, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 5, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 5, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 6, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 6, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 6, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 7, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 7, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 8, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 8, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 9, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 9, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 9, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 10, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 10, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 11, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 11, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 12, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 12, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 12, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 13, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 14, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 15, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 16, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 17, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 17, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 16, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 15, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 14, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 13, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' },
    { idColab: 13, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, completada: false, proyecto: 'Proyecto A' }
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

  getTareasAtrasadas(id: number, fechaInicio: Date) {
    let contadorAtrasadas = 0;
    this.tareas.forEach(tarea => {
      if (tarea.idColab == id && tarea.completada == false && fechaInicio > tarea.fechaPlanificacion) {
        contadorAtrasadas += 1;
      }
    });
    return contadorAtrasadas;
  }

}