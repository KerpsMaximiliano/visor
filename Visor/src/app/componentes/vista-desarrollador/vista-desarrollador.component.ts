import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/services/i2t/tarea.service';
// import { Actividad } from '../../interfaces/actividad';

@Component({
  selector: 'app-vista-desarrollador',
  templateUrl: './vista-desarrollador.component.html',
  styleUrls: ['./vista-desarrollador.component.css']
})
export class VistaDesarrolladorComponent implements OnInit {

  proyectoId: any;
  proyectoNombre?: string;
  tareasSP: any;
  tareasOrg: any[]=[];
  tareasNoIniciadas: Tarea[]=[];
  tareasEnProgreso: Tarea[]=[];
  tareasEnPrueba: Tarea[]=[];
  tareasCompletadas: Tarea[]=[];
  poseeTareasNoIniciadas: boolean = false;
  poseeTareasEnProgreso: boolean = false;
  poseeTareasEnPrueba: boolean = false;
  poseeTareasCompletadas: boolean = false;
  noHayProyecto: boolean = false;
  horasNoIniciadas: number = 0;
  horasEnProgreso: number = 0;
  horasEnPrueba: number = 0;
  horasCompleatadas: number = 0;
  horasTotales: number = 0;

  /* actividadesNoIniciadas: Actividad[] = [];
  actividadesEnProgreso: Actividad[] = [];
  actividadesEnPrueba: Actividad[] = [];
  actividadesCompletadas: Actividad[] = [];
  proyectoSeleccionado: boolean = true;
  poseeTareasCompletadas: boolean = true;

  panelOpenState = false; */
  
  constructor(private _tareaService: TareaService) {
    /* this.cargarActividades();
    this.ordenarListas(); */
  }

  ngOnInit(): void {
    this.proyectoId = "d31cfdaa-049e-e6e3-999d-62b5b2f778b7"; // este dato viene del commponente tareas
    this._tareaService.getTareasDeProyecto(this.proyectoId, 'Produccion').subscribe((response: any) => {
      this.tareasSP = response.dataset;
      this.proyectoNombre = this.tareasSP[0].nombre_proyecto;
      this.organizarTareas();
      console.log(this.tareasOrg);
      this.cargarTareas();
      this.poseeTareas();
      if (!this.noHayProyecto) {
        this.setearBarraProgreso();
        this.ordenarListas();
      }
    });
  }

  organizarTareas() {
    this.tareasSP.forEach((tarea: any) => {
      this.tareasOrg.push({
        titulo: tarea.nombre_tarea,
        proyecto: tarea.nombre_proyecto,
        prioridad: tarea.prioridad,
        asignado: tarea.usuario_asignado,
        facilitador: tarea.facilitador,
        fechaInicio: this.calcularFecha(tarea.fecha_inicio),
        fechaFin: this.calcularFecha(tarea.fecha_fin),
        fechaPlanificacion: this.calcularFecha(tarea.fecha_planificada),
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

  calcularFecha(fecha: string) {
    if (fecha != null) {
      return (fecha.slice(8,10)+'-'+fecha.slice(5,7)+'-'+fecha.slice(0,4));
    } else {
      return null;
    }
  }

  calcularSprint(fechaPlan: string) {
    return (fechaPlan.slice(0,4).concat(fechaPlan.slice(5,7)));
  }

  cargarTareas(){
    this.tareasNoIniciadas = this.getTareasNoIniciadas();
    this.tareasEnProgreso = this.getTareasEnProgreso();
    this.tareasEnPrueba = this.getTareasEnPrueba();
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

  getTareasEnPrueba() {
    const respuesta: Tarea[] = [];
    this.tareasOrg.forEach(tarea => {
      if(tarea.estado == "In Testing") {
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

  poseeTareas() {
    if (this.tareasNoIniciadas.length != 0) {
      this.poseeTareasNoIniciadas = true;
    }
    if (this.tareasEnProgreso.length != 0) {
      this.poseeTareasEnProgreso = true;
    }
    if (this.tareasEnPrueba.length != 0) {
      this.poseeTareasEnPrueba = true;
    }
    if (this.tareasCompletadas.length != 0) {
      this.poseeTareasCompletadas = true;
    }
    if (this.poseeTareasNoIniciadas == false && this.poseeTareasEnProgreso == false && this.poseeTareasEnPrueba == false && this.poseeTareasCompletadas == false) {
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
    this.tareasEnPrueba.forEach(tarea => {
      this.horasEnPrueba += tarea.horasPlanificadas;
    });
    this.tareasCompletadas.forEach(tarea => {
      this.horasCompleatadas += tarea.horasPlanificadas;
    });
    this.horasTotales = this.horasNoIniciadas + this.horasEnProgreso + this.horasEnPrueba + this.horasCompleatadas;
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
    anchoVariable = (this.horasEnPrueba / this.horasTotales * 100);
    const divVerdeClaro = document.getElementById('barraVerdeClaro');
    if (divVerdeClaro != null) {
      divVerdeClaro.style.setProperty('width', (anchoVariable.toString()).concat(porc));
    }
    anchoVariable = (this.horasCompleatadas / this.horasTotales * 100);
    const divVerdeOscuro = document.getElementById('barraVerdeOscuro');
    if (divVerdeOscuro != null) {
      divVerdeOscuro.style.setProperty('width', (anchoVariable.toString()).concat(porc));
    }
  }

  // Ordena la listas primero alfabéticamente, y luego por prioridad
  ordenarListas() {
    this.ordenAlfabetico(this.tareasNoIniciadas);
    this.ordenAlfabetico(this.tareasEnProgreso);
    this.ordenAlfabetico(this.tareasEnPrueba);
    this.ordenAlfabetico(this.tareasCompletadas);
    this.tareasNoIniciadas = this.ordenPrioridad(this.tareasNoIniciadas);
    this.tareasEnProgreso = this.ordenPrioridad(this.tareasEnProgreso);
    this.tareasEnProgreso = this.ordenPrioridad(this.tareasEnPrueba);
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

  // Visualiza el porcentaje de tareas no iniciadas en la plantilla
  cargarBarraRoja() {
    return Math.round(this.horasNoIniciadas / this.horasTotales * 100);
  }

  // Visualiza el porcentaje de tareas en progreso en la plantilla
  cargarBarraAmarilla() {
    return Math.round(this.horasEnProgreso / this.horasTotales * 100);
  }

  // Visualiza el porcentaje de tareas en prueba en la plantilla
  cargarBarraVerdeClaro() {
    return Math.round(this.horasEnPrueba / this.horasTotales * 100);
  }

  // Visualiza el porcentaje de tareas completadas en la plantilla
  cargarBarraVerdeOscuro() {
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

  numeroNulo(numero: number) {
    if (numero == null) {
      return 0;
    } else {
      return numero;
    }
  }

  ////////  ARCHIVO VIEJO ///////

  /* cargarActividades(){
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
  } */

}