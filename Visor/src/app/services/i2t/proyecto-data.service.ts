import { Injectable } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { TareaService } from './tarea.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoDataService {

  fechaActual: Date;
  proyectos: Proyecto[];
  porcentajeAtrasadas: number[];

  constructor(private tareaService: TareaService) { 
    this.fechaActual = new Date(Date.now());
    this.proyectos = [
      {
        nombre: "Chavarini",
        tareas: []
      },
      {
        nombre: "Sala de Sorteos - Extractos Digitales",
        tareas: []
      }
    ]
    this.porcentajeAtrasadas = [];
    this.rellenarTareasProyecto()
    this.calcularTareasAtrasadas()
  }

  /**
   * Método que sive para rellenar las tareas asignadas a cada proyecto.
   */
  rellenarTareasProyecto(){
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

  calcularTareasAtrasadas(){
    let contadorAtrasadas = 0;
    let contadorIniciadas = 0;
    for(let i = 0;i<this.proyectos.length;i++){
      for(let r = 0;r<this.proyectos[i].tareas.length;r++){
        let date = new Date(this.proyectos[i].tareas[r].fechaPlanificacion);
        if(this.proyectos[i].tareas[r].estado == "En Progreso" && date < this.fechaActual){
        
          contadorAtrasadas++;
        }
        else if(this.proyectos[i].tareas[r].estado == "En Progreso"){
          contadorIniciadas++;
        }
      }
      this.porcentajeAtrasadas.push((contadorAtrasadas * 100) / contadorIniciadas)
      contadorAtrasadas = 0;
      contadorIniciadas = 0;
    }
    this.verificasPorcentajesNulos(this.porcentajeAtrasadas);
  }

  /**
   * Método que sirve para eliminar valores NaN del array de porcentajes de tareas atrasadas.
   * @param porcentajeAtrasadas: number[]
   */
  private verificasPorcentajesNulos(porcentajeAtrasadas: number[]){
    for(let i = 0;i<this.porcentajeAtrasadas.length;i++){
      if(isNaN(this.porcentajeAtrasadas[i])){
        this.porcentajeAtrasadas[i] = 0;
      }
    }
  }


  
}
