import { Injectable } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { TareaService } from './tarea.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoDataService {

  private _fechaActual: Date;
  public proyectos: Proyecto[];
  public tareasPorcentajeTareasCompleatadas: number;
  public tareasPorcentajeTareasAtrasadas: number;
  public tareasPorcentajeTareasEnProgreso: number;

  constructor(private tareaService: TareaService) { 
    this._fechaActual = new Date(Date.now());
    this.tareasPorcentajeTareasAtrasadas = 0;
    this.tareasPorcentajeTareasCompleatadas = 0;
    this.tareasPorcentajeTareasEnProgreso = 0;
    this.proyectos = [
      {
        nombre: "Chavarini",
        tareas: [],
        porcentajeTareasAtrasadas: 0,
        porcentajeTareasATiempo: 0,
        porcentajeHPEnPrueba: 0,
        porcentajeHPEnProgreso: 0,
        porcentajeHPCompletadas: 0,
        porcentajeHPNoIniciadas: 0
      },
      {
        nombre: "Sala de Sorteos - Extractos Digitales",
        tareas: [],
        porcentajeTareasAtrasadas: 0,
        porcentajeTareasATiempo: 0,
        porcentajeHPEnPrueba: 0,
        porcentajeHPEnProgreso: 0,
        porcentajeHPCompletadas: 0,
        porcentajeHPNoIniciadas: 0
      }
    ]
    this.rellenarTareasProyecto();
    this.calcularPorcentajeTareas();
    this.calcularAvanceHorasPlanificadas();
  }

  /**
   * Método que sirve para retornar la lista de proyectos.
   * @return proyectos: Proyecto[]
   */
  get proyecto(): Proyecto[]
  {
    return this.proyectos;
  }

  /**
   * Método privado que sive para rellenar las tareas asignadas a cada proyecto.
   */
  private rellenarTareasProyecto(){
    for(let i = 0;i<this.proyectos.length;i++){
      for(let r = 0;r<this.tareaService.tareas.length;r++)
      {
        if(this.proyectos[i].nombre == this.tareaService.tareas[r].proyecto)
        {
          this.proyectos[i].tareas.push(this.tareaService.tareas[r]); 
        }
      }
    } 
  }

  /**
   * Método privado que sirve para calcular el porcentaje de tareas atrasadas.
   */

  private calcularPorcentajeTareas(){
    let contadorAtrasadas = 0;
    let contadorTareasTotales = 0;
    for(let i = 0;i<this.proyectos.length;i++){
      for(let r = 0;r<this.proyectos[i].tareas.length;r++){
        let date = new Date(this.proyectos[i].tareas[r].fechaPlanificacion);
        if(this.proyectos[i].tareas[r].estado == "En Progreso" && date < this._fechaActual){
        
          contadorAtrasadas++;
        }
        contadorTareasTotales++;
      }
      this.proyectos[i].porcentajeTareasAtrasadas = Math.round((contadorAtrasadas / contadorTareasTotales) * 100);
      this.proyectos[i].porcentajeTareasATiempo = Math.round(((contadorTareasTotales - contadorAtrasadas ) / contadorTareasTotales) * 100);
      contadorAtrasadas = 0;
      contadorTareasTotales = 0;
    }
    this.verificasPorcentajesNulos(); 
  }

  /**
   * Método que sirve para eliminar valores nulos del array de porcentajes de tareas atrasadas.
   */
  private verificasPorcentajesNulos(){
    for(let i = 0;i<this.proyectos.length;i++){
      if(isNaN(this.proyectos[i].porcentajeTareasAtrasadas)){
        this.proyectos[i].porcentajeTareasAtrasadas = 0;
      }
      if(isNaN(this.proyectos[i].porcentajeTareasATiempo))
      {
        this.proyectos[i].porcentajeTareasATiempo = 0;
      }
    }
  } 

  /**
   * Método que sirve para calcular el porcentaje de las horas planificadas en los 4 estados.
   */
  private calcularAvanceHorasPlanificadas(){
    //Contadores.
    let contadorHPTareasTotales = 0;
    let contadorHPCompletadas = 0;
    let contadorHPEnProgreso = 0;
    let contadorHPNoIniciadas = 0;
    let contadorHPEnPrueba = 0;
    for(let i = 0;i<this.proyectos.length;i++){
      for(let r = 0;r<this.proyectos[i].tareas.length;r++){
        switch (this.proyectos[i].tareas[r].estado)
        {
          case "Completada": {
            contadorHPCompletadas = contadorHPCompletadas + this.proyectos[i].tareas[r].horasPlanificadas;
            break;
          }
          case "En Progreso": {
            contadorHPEnProgreso = contadorHPEnProgreso + this.proyectos[i].tareas[r].horasPlanificadas;
            console.log(contadorHPEnProgreso);
            break;
          }
          case "No Iniciada": {
            contadorHPNoIniciadas = contadorHPNoIniciadas + this.proyectos[i].tareas[r].horasPlanificadas;
            break;
          }
          case "En Prueba": {
            contadorHPEnPrueba = contadorHPEnPrueba + this.proyectos[i].tareas[r].horasPlanificadas;
            break;
          }
        }
        contadorHPTareasTotales = contadorHPTareasTotales + this.proyectos[i].tareas[r].horasPlanificadas;
      }
      this.proyectos[i].porcentajeHPEnProgreso = Math.round((contadorHPEnProgreso / contadorHPTareasTotales) * 100);
      this.proyectos[i].porcentajeHPCompletadas = Math.round((contadorHPCompletadas / contadorHPTareasTotales * 100));
      this.proyectos[i].porcentajeHPNoIniciadas = Math.round((contadorHPNoIniciadas / contadorHPTareasTotales) * 100);
      this.proyectos[i].porcentajeHPEnPrueba = Math.round((contadorHPEnPrueba / contadorHPTareasTotales) * 100);
      contadorHPCompletadas = 0;
      contadorHPEnProgreso = 0;
      contadorHPNoIniciadas = 0;
      contadorHPEnPrueba = 0;
      contadorHPTareasTotales = 0;
    }
  }
}
