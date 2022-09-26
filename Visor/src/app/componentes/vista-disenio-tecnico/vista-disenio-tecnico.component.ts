import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/services/i2t/tarea.service';

@Component({
  selector: 'app-vista-disenio-tecnico',
  templateUrl: './vista-disenio-tecnico.component.html',
  styleUrls: ['./vista-disenio-tecnico.component.css']
})
export class VistaDisenioTecnicoComponent implements OnInit{

  proyectoId: any;
  tareasSP: any;
  tareasOrg: any[]=[];
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

  constructor(private _tareaService: TareaService) {  }

  ngOnInit(): void {
    this.proyectoId = "d31cfdaa-049e-e6e3-999d-62b5b2f778b7"; // este dato viene del commponente tareas
    this._tareaService.getTareasDeProyecto(this.proyectoId).subscribe((response: any) => {
      this.tareasSP = response.dataset;
      this.organizarTareas();
      console.log(this.tareasOrg);
      this.cargarTareas();
      this.poseeTareas();
      if (!this.noHayProyecto) {
        this.setearBarraProgreso();
        this.ordenarListas();
      }
    });;
  }

  organizarTareas() {
    this.tareasSP.forEach((tarea: any) => {
      this.tareasOrg.push({
        titulo: tarea.nombre_tarea,
        proyecto: tarea.nombre_proyecto,
        prioridad: tarea.prioridad,
        asignado: tarea.usuario_asignado,
        facilitador: tarea.facilitador,
        fechaInicio: null,                 // revisar request para este campo
        fechaFin: null,                    // revisar request para este campo
        fechaPlanificacion: tarea.fecha_planificada,
        horasPlanificadas: tarea.horas_planificadas,
        horasEjecutadas: tarea.horas_ejecutadas,
        documento: tarea.nombre_documento,
        tareasPrecondicion: null,          // para esta entrega queda asi
        notas: tarea.nota,
        tipoTarea: tarea.tipo_tarea,
        estado: tarea.estado,
        sprint: this.calcularSprint(tarea.fecha_planificada)
      })
    });
  };

  calcularSprint(fechaPlan: string) {
    return (fechaPlan.slice(0,4).concat(fechaPlan.slice(5,7)));
  }

  // Inyecto las tareas desde el servicio
  cargarTareas(){
    this.tareasNoIniciadas = this.getTareasNoIniciadas();
    this.tareasEnProgreso = this.getTareasEnProgreso();
    this.tareasCompletadas = this.getTareasCompletadas();
  }

  getTareasNoIniciadas() {
    const respuesta: Tarea[] = [];
    this.tareasOrg.forEach(tarea => {
      if(tarea.estado == "Not Started") {
        respuesta.push(tarea);
      }
    });
    return respuesta;
  }

  getTareasEnProgreso() {
    const respuesta: Tarea[] = [];
    this.tareasOrg.forEach(tarea => {
      if(tarea.estado == "In Progress") {
        respuesta.push(tarea);
      }
    });
    return respuesta;
  }
    
  getTareasCompletadas() {
    const respuesta: Tarea[] = [];
    this.tareasOrg.forEach(tarea => {
      if(tarea.estado == "Completed") {
          respuesta.push(tarea);
      }
    });
    return respuesta;
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
  ordenAlfabetico(lista: Array<Tarea>) {
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
  ordenPrioridad(lista: Array<Tarea>) {
    let arrayOrdenado: Tarea[]=[];
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
    if (tarea.prioridad == null) {
      arrayOrdenado.push(tarea);
    }});
    console.log(arrayOrdenado);
    return arrayOrdenado;
  }

}