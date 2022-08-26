import { Component, OnInit } from '@angular/core';
import { Actividad } from './interfaces/actividad';
import { TareasFuncionalService } from './interfaces/tareas-funcional.service';

@Component({
  selector: 'app-vista-analista-funcional',
  templateUrl: './vista-analista-funcional.component.html',
  styleUrls: ['./vista-analista-funcional.component.css']
})
export class VistaAnalistaFuncionalComponent implements OnInit {

  tareasNoIniciadas: Actividad[]=[];
  tareasEnProgreso: Actividad[]=[];
  tareasCompletadas: Actividad[]=[];
  poseeTareasNoIniciadas: boolean = false;
  poseeTareasEnProgreso: boolean = false;
  poseeTareasCompletadas: boolean = false;
  noHayProyecto: boolean = false;
  horasNoIniciadas: number = 0;
  horasEnProgreso: number = 0;
  horasCompleatadas: number = 0;
  horasTotales: number = 0;

  constructor(private _tareasFuncional: TareasFuncionalService) {  }

  ngOnInit(): void {
    this.cargarTareas();
    this.poseeTareas();
    if (!this.noHayProyecto) {
      this.setearBarraProgreso();
      this.ordenarListas();
    }
  }

  // Inyecto las tareas desde el servicio
  cargarTareas(){
    this.tareasNoIniciadas = this._tareasFuncional.getTareasNoIniciadas();
    this.tareasEnProgreso = this._tareasFuncional.getTareasEnProgreso();
    this.tareasCompletadas = this._tareasFuncional.getTareasCompletadas();
  }

  // Si no hay tareas, no se visualiza el proyecto
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

  // Seteo la barra de progreso contabilizando el total de horas, y estableciendo los porcentajes y ancho de barras
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

  // Visualiza el porcentaje de tareas no iniciadas en la plantilla
  cargarBarraRoja() {
    return Math.round(this.horasNoIniciadas / this.horasTotales * 100);
  }

  // Visualiza el porcentaje de tareas en progreso en la plantilla
  cargarBarraAmarilla() {
    return Math.round(this.horasEnProgreso / this.horasTotales * 100);
  }

  // Visualiza el porcentaje de tareas completadas en la plantilla
  cargarBarraVerde() {
    return Math.round(this.horasCompleatadas / this.horasTotales * 100);
  }

  // Calculo el desvío para retornar true si es negativo y false si es positivo
  calcularDesvio(horasPlanificadas: number, horasEjecutadas: number) {
    return (horasPlanificadas-horasEjecutadas < 0);
  }

  // Retorno el valor absoluto del desvio (se debe visualizar sin signo en la plantilla)
  valorAbsoluto(numero: number) {
    return Math.abs(numero);
  }

  // Ordena la listas primero alfabéticamente, y luego por prioridad
  ordenarListas() {
    this.ordenAlfabetico(this.tareasNoIniciadas);
    this.ordenAlfabetico(this.tareasEnProgreso);
    this.ordenAlfabetico(this.tareasCompletadas);
    this.tareasNoIniciadas = this.ordenPrioridad(this.tareasNoIniciadas);
    this.tareasEnProgreso = this.ordenPrioridad(this.tareasEnProgreso);
    this.tareasCompletadas = this.ordenPrioridad(this.tareasCompletadas);
  }

  // Ordena una lista por orden alfabético
  ordenAlfabetico(lista: Array<Actividad>) {
    lista.sort(function(a, b) {
      if (a.titulo > b.titulo) {
        return 1;
      }
      if (a.titulo < b.titulo) {
        return -1;
      }
      return 0;
    });
  }

  // Ordena una lista por prioridad
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
