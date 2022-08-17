import { Component, OnInit } from '@angular/core';
import { Actividad } from './interfaces/actividad';

@Component({
  selector: 'app-vista-analista-funcional',
  templateUrl: './vista-analista-funcional.component.html',
  styleUrls: ['./vista-analista-funcional.component.css']
})
export class VistaAnalistaFuncionalComponent implements OnInit {

  actividadesNoIniciadas: Actividad[];
  actividadesEnProgreso: Actividad[];
  actividadesCompletadas: Actividad[];
  poseeTareasEnProgreso  !: boolean;
  poseeTareasCompletadas!: boolean;

  panelOpenState = false;
  
  constructor() {
    this.cargarActividades()
    this.actividadesNoIniciadas = [{
      titulo: "TP 28 - xxx",
      prioridad: "Alta",
      asignado: "Franco Friggeri",
      facilitador: "Adrian Enrico",
      fechas: "22/08/2022",
      horasPlanificadas: 17,
      horasEjecutadas: 15,
      horasDesvio: 2,
      documento: "Documento 1",
      tareasPrecondicion: "Tarea 1",
      notas: ""
    },
    {
      titulo: "TP 12 - xxx",
      prioridad: "Baja",
      asignado: "Luciano De Giorgio",
      facilitador: "Federico Gauchat",
      fechas: "10/08/2022",
      horasPlanificadas: 4,
      horasEjecutadas: 4,
      horasDesvio: 2,
      documento: "Documento 2",
      tareasPrecondicion: "Tarea 9",
      notas: ""
    }
  ]
    this.actividadesEnProgreso = [];
    this.actividadesCompletadas = [{
      titulo: "TP 28 - xxx",
      prioridad: "Alta",
      asignado: "Franco Friggeri",
      facilitador: "Adrian Enrico",
      fechas: "22/08/2022",
      horasPlanificadas: 17,
      horasEjecutadas: 15,
      horasDesvio: 2,
      documento: "Documento 1",
      tareasPrecondicion: "Tarea 1",
      notas: ""
    }];
   }

  ngOnInit(): void {
  }

  cargarActividades(){
    this.poseeTareasEnProgreso = false;
    this.poseeTareasCompletadas = true;
  }
}
