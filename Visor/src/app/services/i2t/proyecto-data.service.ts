import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})

// TODO: getProyectos() y getProyectosAbiertos() generan la misma respuesta por lo que la propiedad 'abierto' es redundante.
export class ProyectoDataService {
  constructor(private restService: RestService) {}

  /**
   * * Provee todos los casos (proyectos).
   * ! Propiedad 'id_caso' redundante.
   * ! Propiedad 'id_usuario' redundante.
   * @returns ID, nombre, número, cliente, asignado, tareas totales y tareas atrasadas.
   */
  public getProjects() {
    let jsbody: string = JSON.stringify({
      nivel: '1',
      id_caso: '',
      id_usuario: null,
      abierto: 'FALSE',
    });
    return this.restService.callProcedimientoVisor(jsbody, 'EstadoProyectos');
  }

  /**
   * * Provee las horas globales de un caso (proyecto).
   * ! Parametro 'abierto' redundante ya que no modifica la respuesta del servidor.
   * ! Respuesta del servidor incoherente. Propiedades duplicadas y valor sin propiedad asignada.
   * @param id_caso ID de un caso (proyecto).
   * @param abierto Estado del caso (proyecto).
   * @returns Hora y estado.
   */
  public getProjectStatus(id_caso: string, abierto: string) {
    let jsbody: string = JSON.stringify({
      nivel: '2',
      id_caso: id_caso,
      id_usuario: null,
      abierto: abierto,
    });
    return this.restService.callProcedimientoVisor(jsbody, 'EstadoProyectos');
  }

  /**
   * * Provee las horas de cada área de un caso (proyecto).
   * ! Parametro 'abierto' redundante ya que no modifica la respuesta del servidor.
   * @param id_caso ID de un caso (proyecto).
   * @param abierto Estado del caso (proyecto).
   * @returns Área, estado y cantidad de horas.
   */
  public getProjectAreas(id_caso: string, abierto: string) {
    let jsbody: string = JSON.stringify({
      nivel: '3',
      id_caso: id_caso,
      id_usuario: null,
      abierto: abierto,
    });
    return this.restService.callProcedimientoVisor(jsbody, 'EstadoProyectos');
  }

  // ! Función no utilizada.
  public getProjectsOpen() {
    let jsbody: string = JSON.stringify({
      nivel: '1',
      id_caso: '',
      id_usuario: null,
      abierto: 'TRUE',
    });
    return this.restService.callProcedimientoVisor(jsbody, 'EstadoProyectos');
  }
}
