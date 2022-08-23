import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/interfaces/tarea.service';

@Component({
  selector: 'app-vista-disenio-tecnico',
  templateUrl: './vista-disenio-tecnico.component.html',
  styleUrls: ['./vista-disenio-tecnico.component.css']
})
export class VistaDisenioTecnicoComponent implements OnInit{

  tareasNoIniciadas: Tarea[]=[];
  tareasEnProgreso: Tarea[]=[];
  tareasCompletadas: Tarea[]=[];
  poseeTareasNoIniciadas: boolean = false;
  poseeTareasEnProgreso: boolean = false;
  poseeTareasCompletadas: boolean = false;
  horasNoIniciadas: number = 0;
  horasEnProgreso: number = 0;
  horasCompleatadas: number = 0;
  horasTotales: number = 0;

  panelOpenState = false;

  constructor(private _tareaService: TareaService) {  }

  ngOnInit(): void {
    this.cargarTareas();
    this.poseeTareas();
    this.setearBarraProgreso();
  }

  cargarTareas(){
    this.tareasNoIniciadas = this._tareaService.getTareasNoIniciadas();
    this.tareasEnProgreso = this._tareaService.getTareasEnProgreso();
    this.tareasCompletadas = this._tareaService.getTareasCompletadas();
  }

  poseeTareas() {
    if (this.tareasNoIniciadas != undefined) {
      this.poseeTareasNoIniciadas = true;
    }
    if (this.tareasEnProgreso != undefined) {
      this.poseeTareasEnProgreso = true;
    }
    if (this.tareasCompletadas != undefined) {
      this.poseeTareasCompletadas = true;
    }
  }

  setearBarraProgreso() {
    this.tareasNoIniciadas.forEach(tarea => {
      this.horasNoIniciadas += tarea.horasPlanificadas;
    });
    this.tareasEnProgreso.forEach(tarea => {
      this.horasEnProgreso += tarea.horasPlanificadas;
    });
    this.tareasCompletadas.forEach(tarea => {
      this.horasCompleatadas += tarea.horasPlanificadas;
    });
    this.horasTotales = this.horasNoIniciadas + this.horasEnProgreso + this.horasCompleatadas;
  }

  cargarBarraRoja() {
    return Math.round(this.horasNoIniciadas / this.horasTotales * 100);
  }

  cargarBarraAmarilla() {
    return Math.round(this.horasEnProgreso / this.horasTotales * 100);
  }

  cargarBarraVerde() {
    return Math.round(this.horasCompleatadas / this.horasTotales * 100);
  }

  calcularDesvio(horasPlanificadas: number, horasEjecutadas: number) {
    return (horasPlanificadas-horasEjecutadas < 0);
  }

  valorAbsoluto(numero: number) {
    return Math.abs(numero);
  }
  
}