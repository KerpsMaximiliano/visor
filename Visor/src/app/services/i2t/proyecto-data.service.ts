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
        porcentajeTareasEnPrueba: 0,
        porcentajeTareasEnProgreso: 0,
        porcentajeTareasCompletadas: 0
      },
      {
        nombre: "Sala de Sorteos - Extractos Digitales",
        tareas: [],
        porcentajeTareasAtrasadas: 0,
        porcentajeTareasATiempo: 0,
        porcentajeTareasEnPrueba: 0,
        porcentajeTareasEnProgreso: 0,
        porcentajeTareasCompletadas: 0
      }
    ]
    this.rellenarTareasProyecto();
    this.calcularPorcentajeTareas();
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
    let contadorIniciadas = 0;
    let contadorTareasTotales = 0;
    let contadorCompletadas = 0;
    let contadorEnProgreso = 0;
    for(let i = 0;i<this.proyectos.length;i++){
      for(let r = 0;r<this.proyectos[i].tareas.length;r++){
        let date = new Date(this.proyectos[i].tareas[r].fechaPlanificacion);
        if(this.proyectos[i].tareas[r].estado == "En Progreso" && date < this._fechaActual){
        
          contadorAtrasadas++;
        }
        else{
          contadorIniciadas++;
        }
        switch (this.proyectos[i].tareas[r].estado)
        {
          case "Completada": {
            contadorCompletadas++;
            console.log("pase por aca je");
            break;
          }
          case "En Progreso": {
            contadorEnProgreso++;
            console.log("viva el progreso");
            break;
          }
        }
        
        contadorTareasTotales++;
      }
      this.proyectos[i].porcentajeTareasAtrasadas = Math.round((contadorAtrasadas / contadorTareasTotales) * 100);
      this.proyectos[i].porcentajeTareasATiempo = Math.round(((contadorTareasTotales - contadorAtrasadas ) / contadorTareasTotales) * 100);
      this.tareasPorcentajeTareasCompleatadas = Math.round(((contadorTareasTotales - contadorCompletadas)/ contadorTareasTotales) * 100);
      this.tareasPorcentajeTareasEnProgreso = Math.round(((contadorTareasTotales - contadorEnProgreso) / contadorTareasTotales) * 100);
      contadorAtrasadas = 0;
      contadorIniciadas = 0;
      contadorTareasTotales = 0;
      contadorCompletadas = 0;
      contadorEnProgreso = 0;
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
}
