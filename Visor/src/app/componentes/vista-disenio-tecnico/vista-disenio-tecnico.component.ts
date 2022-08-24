import { Component, OnInit, ViewChild } from '@angular/core';
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
  noHayProyecto: boolean = false;
  horasNoIniciadas: number = 0;
  horasEnProgreso: number = 0;
  horasCompleatadas: number = 0;
  horasTotales: number = 0;

  /* @ViewChild('barraRoja') divRojo?: HTMLElement;
  @ViewChild('barraAmarilla') divAmarillo?: HTMLElement;
  @ViewChild('barraVerde') divVerde?: HTMLElement; */

  constructor(private _tareaService: TareaService) {  }

  ngOnInit(): void {
    this.cargarTareas();
    this.poseeTareas();
    if (!this.noHayProyecto) {
      this.setearBarraProgreso();
    }
  }

  /* ngAfterViewInit() {
    if (!this.noHayProyecto) {
      this.setearBarraProgreso();
    }
  } */

  cargarTareas(){
    this.tareasNoIniciadas = this._tareaService.getTareasNoIniciadas();
    this.tareasEnProgreso = this._tareaService.getTareasEnProgreso();
    this.tareasCompletadas = this._tareaService.getTareasCompletadas();
  }

  poseeTareas() {
    if (this.tareasNoIniciadas.length != 0) {
      this.poseeTareasNoIniciadas = true;
    }
    if (this.tareasEnProgreso.length != 0) {
      this.poseeTareasEnProgreso = true;
    }
    if (this.tareasCompletadas.length != 0) {
      this.poseeTareasCompletadas = true;
    }
    if (this.poseeTareasNoIniciadas == false && this.poseeTareasEnProgreso == false && this.poseeTareasCompletadas == false) {
      this.noHayProyecto = true;
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
    const porc = '%';
    let anchoVariable = (this.horasNoIniciadas / this.horasTotales * 100);
    const divRojo = document.getElementById('barraRoja');
    if (divRojo != null) {
      divRojo.style.setProperty('width', (anchoVariable.toString()).concat(porc));
    }
    anchoVariable = (this.horasEnProgreso / this.horasTotales * 100);
    const divAmarillo = document.getElementById('barraAmarilla');
    if (divAmarillo != null) {
      divAmarillo.style.setProperty('width', (anchoVariable.toString()).concat(porc));
    }
    anchoVariable = (this.horasCompleatadas / this.horasTotales * 100);
    const divVerde = document.getElementById('barraVerde');
    if (divVerde != null) {
      divVerde.style.setProperty('width', (anchoVariable.toString()).concat(porc));
    }
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