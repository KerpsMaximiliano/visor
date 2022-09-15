import { Injectable } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  colaboradores: Colaborador[] = [
    { id: 1, nombre: 'Facundo', apellido: 'Ghio Serra', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 2, nombre: 'Patricio', apellido: 'Macagno', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 3, nombre: 'Gian', apellido: 'Laner', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 4, nombre: 'Franco', apellido: 'Friggeri', funcion: 'Analista Tecnico', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 5, nombre: 'Franco', apellido: 'Corvalan', funcion: 'Analista Tecnico', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 6, nombre: 'Jeremias', apellido: 'Garcia', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 7, nombre: 'Ignacio', apellido: 'Girod', funcion: 'Desarrollador', capacidad: 80, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 8, nombre: 'Fabio', apellido: 'Olivera', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 9, nombre: 'Augusto', apellido: 'Escandon', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 10, nombre: 'Federico', apellido: 'Gauchat', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 11, nombre: 'Franco', apellido: 'Caldaroni', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 12, nombre: 'Luciano', apellido: 'De Giorgio', funcion: 'Desarrollador', capacidad: 80, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 13, nombre: 'Lucio', apellido: 'Cocuccio', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 14, nombre: 'Pablo', apellido: 'Corujo', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 15, nombre: 'Leandro', apellido: 'Blodorn', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 16, nombre: 'Maximiliano', apellido: 'Reichert', funcion: 'Analista Tecnico', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: 17, nombre: 'Lucas', apellido: 'Rios', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 }

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
    { id: 1, idColab: 1, fechaPlanificacion: new Date(2022, 9, 5), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 2, idColab: 1, fechaPlanificacion: new Date(2022, 8, 5), horasPlanificadas: 20, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 3, idColab: 1, fechaPlanificacion: new Date(2022, 11, 9), horasPlanificadas: 14, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 4, idColab: 2, fechaPlanificacion: new Date(2022, 11, 5), horasPlanificadas: 55, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 5, idColab: 2, fechaPlanificacion: new Date(2022, 9, 5), horasPlanificadas: 37, estado: 'No iniciada', proyecto: 'Proyecto B' },
    { id: 6, idColab: 2, fechaPlanificacion: new Date(2022, 8, 15), horasPlanificadas: 28, estado: 'No iniciada', proyecto: 'Proyecto C' },
    { id: 7, idColab: 3, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 8, idColab: 3, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 9, idColab: 3, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 10, idColab: 4, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 11, idColab: 4, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 12, idColab: 5, fechaPlanificacion: new Date(2023, 8, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 13, idColab: 5, fechaPlanificacion: new Date(2023, 8, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 14, idColab: 5, fechaPlanificacion: new Date(2023, 8, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 15, idColab: 6, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 16, idColab: 6, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 17, idColab: 6, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 18, idColab: 7, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 19, idColab: 7, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 20, idColab: 8, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 21, idColab: 8, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 22, idColab: 9, fechaPlanificacion: new Date(2023, 8, 17), horasPlanificadas: 32, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 23, idColab: 9, fechaPlanificacion: new Date(2023, 8, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto B' },
    { id: 24, idColab: 9, fechaPlanificacion: new Date(2023, 8, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto B' },
    { id: 25, idColab: 10, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 26, idColab: 10, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 27, idColab: 11, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 28, idColab: 11, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 29, idColab: 12, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 30, idColab: 12, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 31, idColab: 12, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 32, idColab: 13, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 33, idColab: 14, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 34, idColab: 15, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 35, idColab: 16, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 36, idColab: 17, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 37, idColab: 17, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 38, idColab: 16, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 39, idColab: 15, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'No iniciada', proyecto: 'Proyecto A' },
    { id: 40, idColab: 14, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 41, idColab: 13, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' },
    { id: 42, idColab: 13, fechaPlanificacion: new Date(2023, 11, 17), horasPlanificadas: 24, estado: 'En progreso', proyecto: 'Proyecto A' }
  ];

  getColaboradores() {
    return this.colaboradores;
  }

  getTareasColaborador(id: number, fechaInicio: Date) {
    let tareas:any=[];
    this.tareas.forEach(tarea => {
      if (tarea.idColab == id) {
        if (tarea.fechaPlanificacion > fechaInicio) {
          tareas.push(tarea);
        } else if (tarea.fechaPlanificacion.getMonth() == fechaInicio.getMonth() && tarea.fechaPlanificacion.getFullYear() == fechaInicio.getFullYear()) {
          tareas.push(tarea);
        }
      }
    });
    return tareas;
  }

  getMesString(fecha: number) {
    if (fecha>11) {
      fecha -= 12;
    }
    switch (fecha) {
      case 0:
        return 'Enero';
      case 1:
        return 'Febrero';
      case 2:
        return 'Marzo';
      case 3:
        return 'Abril';
      case 4:
        return 'Mayo';
      case 5:
        return 'Junio';
      case 6:
        return 'Julio';
      case 7:
        return 'Agosto';
      case 8:
        return 'Septiembre';
      case 9:
        return 'Octubre';
      case 10:
        return 'Noviembre';
      case 11:
        return 'Diciembre';
      default:
        return '';
    }
  }

  getMesDate(mes: string) {
    switch (mes) {
      case 'Enero':
        return 0;
      case 'Febrero':
        return 1;
      case 'Marzo':
        return 2;
      case 'Abril':
        return 3;
      case 'Mayo':
        return 4;
      case 'Junio':
        return 5;
      case 'Julio':
        return 6;
      case 'Agosto':
        return 7;
      case 'Septiembre':
        return 8;
      case 'Octubre':
        return 9;
      case 'Noviembre':
        return 10;
      case 'Diciembre':
        return 11;
      default:
        return -1;
    }
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
    if (mesInicio>12) {
      mesInicio -= 12;
    }
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

}