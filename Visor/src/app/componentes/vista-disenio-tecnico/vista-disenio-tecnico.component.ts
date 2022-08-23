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
  poseeTareasEnProgreso: boolean = false;
  poseeTareasCompletadas: boolean = true;

  panelOpenState = false;

  constructor(private _tareaService: TareaService) {  }

  ngOnInit(): void {
    this.cargarProyectos()
  }

  cargarProyectos(){
    this.tareasNoIniciadas = this._tareaService.getTareasNoIniciadas();
    this.tareasEnProgreso = this._tareaService.getTareasEnProgreso();
    this.tareasCompletadas = this._tareaService.getTareasCompletadas();
  }

  calcularDesvio(horasPlanificadas: number, horasEjecutadas: number) {
    return (horasPlanificadas-horasEjecutadas < 0);
  }

  valorAbsoluto(numero: number) {
    return Math.abs(numero);
  }
}