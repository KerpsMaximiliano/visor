import { Component, OnInit } from '@angular/core';
import { Actividad } from './interfaces/actividad';

@Component({
  selector: 'app-vista-analista-funcional',
  templateUrl: './vista-analista-funcional.component.html',
  styleUrls: ['./vista-analista-funcional.component.css']
})
export class VistaAnalistaFuncionalComponent implements OnInit {

  actividadesNoIniciadas: Actividad[] = [];
  actividadesEnProgreso: Actividad[] = [];
  actividadesEnPrueba: Actividad[] = [];
  actividadesCompletadas: Actividad[] = [];
  proyectoSeleccionado: boolean = true;
  poseeTareasCompletadas: boolean = true;

  panelOpenState = false;
  
  constructor() {
    this.cargarActividades();
    this.ordenarListas();
  }

  ngOnInit(): void {
  }

  cargarActividades(){
    this.actividadesNoIniciadas = [{
      titulo: "CHANO - xxx",
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
      titulo: "A - xxx",
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
    this.actividadesEnProgreso = [{
      titulo: "EN PROGRESO 1 - xxx",
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
      titulo: "EN PROGRESO 2 - xxx",
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
    ];
    this.actividadesEnPrueba = [{
      titulo: "EN PRUEBA 1 - xxx",
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
      titulo: "EN PRUEBA 2 - xxx",
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
    this.actividadesCompletadas = [{
      
      titulo: "COMPLETADA 1 - xxx",
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

  ordenarListas() {
    this.ordenAlfabetico(this.actividadesNoIniciadas);
    this.ordenAlfabetico(this.actividadesEnProgreso);
    this.ordenAlfabetico(this.actividadesEnPrueba);
    this.ordenAlfabetico(this.actividadesCompletadas);
    // this.actividadesNoIniciadas = this.ordenPrioridad(this.actividadesNoIniciadas);
    // this.actividadesEnProgreso = this.ordenPrioridad(this.actividadesEnProgreso);
    // this.actividadesEnPrueba = this.ordenPrioridad(this.actividadesEnPrueba);
    // this.actividadesCompletadas = this.ordenPrioridad(this.actividadesCompletadas);
  }

  ordenAlfabetico(lista: Array<Actividad>) {
    console.log("entra")
    lista.sort(function(a, b) {
      
      if (a.titulo > b.titulo) {
        console.log("Retorna 1: " + a.titulo + b.titulo)
        return 1;
      }
      if (a.titulo < b.titulo) {
        console.log("Retorna -1: " + a.titulo + b.titulo)
        return -1;
      }
      return 0;
    });
  }

  ordenPrioridad(lista: Array<Actividad>) {
    let arrayOrdenado: Actividad[]=[];
    lista.forEach(tarea => {
    if (tarea.prioridad == 'Alta') {
      arrayOrdenado.push(tarea);
    }});
    lista.forEach(tarea => {
    if (tarea.prioridad == 'Media') {
      arrayOrdenado.push(tarea);
    }});
    lista.forEach(tarea => {
    if (tarea.prioridad == 'Baja') {
      arrayOrdenado.push(tarea);
    }});
    lista.forEach(tarea => {
    if (tarea.prioridad == '') {
      arrayOrdenado.push(tarea);
    }});
    console.log(arrayOrdenado);
    return arrayOrdenado;
  }



}
