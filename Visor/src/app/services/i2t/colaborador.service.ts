import { Injectable } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/colaborador';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private rest: RestService) { }

  colaboradores: Colaborador[] = [
    { id: '1', nombre: 'Facundo', apellido: 'Ghio Serra', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '2', nombre: 'Patricio', apellido: 'Macagno', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '3', nombre: 'Gian', apellido: 'Laner', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '4', nombre: 'Franco', apellido: 'Friggeri', funcion: 'Analista Tecnico', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '5', nombre: 'Franco', apellido: 'Corvalan', funcion: 'Analista Tecnico', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '6', nombre: 'Jeremias', apellido: 'Garcia', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '7', nombre: 'Ignacio', apellido: 'Girod', funcion: 'Desarrollador', capacidad: 80, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '8', nombre: 'Fabio', apellido: 'Olivera', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '9', nombre: 'Augusto', apellido: 'Escandon', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '10', nombre: 'Federico', apellido: 'Gauchat', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '11', nombre: 'Franco', apellido: 'Caldaroni', funcion: 'Analista Funcional', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '12', nombre: 'Luciano', apellido: 'De Giorgio', funcion: 'Desarrollador', capacidad: 80, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '13', nombre: 'Lucio', apellido: 'Cocuccio', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '14', nombre: 'Pablo', apellido: 'Corujo', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '15', nombre: 'Leandro', apellido: 'Blodorn', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '16', nombre: 'Maximiliano', apellido: 'Reichert', funcion: 'Analista Tecnico', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 },
    { id: '17', nombre: 'Lucas', apellido: 'Rios', funcion: 'Desarrollador', capacidad: 160, horasPlanificadas: 0, tiempoDisponible: 0, atrasadas: 0, horasAtrasadas: 0 }
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

  disponibilidadUsuario(nivel: number, cant_meses: number, fecha: string) {
    let jsbody: string = JSON.stringify({
      nivel : nivel,
      cant_meses : cant_meses,
      fecha_fin : fecha
    });
    return this.rest.callProcedimientoVisor(jsbody, "DisponibilidadUsuario");
  }

}