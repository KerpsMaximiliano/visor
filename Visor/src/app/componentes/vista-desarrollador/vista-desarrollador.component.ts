import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TareasComponent } from 'src/app/components/tareas/tareas.component';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/services/i2t/tarea.service';

@Component({
  selector: 'app-vista-desarrollador',
  templateUrl: './vista-desarrollador.component.html',
  styleUrls: ['./vista-desarrollador.component.css']
})
export class VistaDesarrolladorComponent implements OnInit, OnChanges {

  anchoRojo: string = '0';
  anchoAmarilla: string = '0';
  anchoVerdeClaro: string = '0';
  anchoVerdeOscuro: string = '0';
  proyectoId: any;
  proyectoNombre?: string;
  //tareasSP: any;
  tareasOrg: any[]=[];
  tareasNoIniciadas: Tarea[]=[];
  tareasEnProgreso: any[]=[];
  tareasEnProgresoAux: any[]=[];
  tareasAyuda: any[]=[];
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
  filtroAyuda: boolean = false;
  panelActividadesAbierto: boolean= false;
  
  constructor(private _tareaService: TareaService, private _tareaComponent: TareasComponent) { }

  @Input() tareasSP: any = [];
  //@Output() vistaS = new EventEmitter<string>();

  ngOnInit(): void {
    this.proyectoId = "d31cfdaa-049e-e6e3-999d-62b5b2f778b7"; // este dato viene del commponente tareas
    /*this._tareaService.getTareasDeProyecto(this.proyectoId, 'Produccion').subscribe((response: any) => {
      this.tareasSP = response.dataset;
      this.proyectoNombre = this.tareasSP[0].nombre_proyecto;
      this.organizarTareas();
      this.cargarTareas();
      this.poseeTareas();
      if (!this.noHayProyecto) {
        this.setearBarraProgreso();
        this.ordenarListas();
      }
    });*/

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.tareasSP)
    if (this.tareasSP.length > 0) {
      if(changes['tareasSP'].previousValue == undefined || changes['tareasSP'].previousValue.length == 0){ //Selecciona primero proyecto después vista
        console.log(this.anchoRojo, this.anchoAmarilla, this.anchoVerdeClaro)

        this.organizarTareas();
        this.cargarTareas();
        this.poseeTareas();
        if (!this.noHayProyecto) {
          this.setearBarraProgreso();
          this.ordenarListas();
        }
        console.log("Entró 1")
      }

      else if( (changes['tareasSP'].previousValue[0].nombre_proyecto != changes['tareasSP'].currentValue[0].nombre_proyecto) ){
        console.log(changes['tareasSP'].previousValue )
        console.log(changes['tareasSP'].currentValue)
        this.anchoRojo = '0'
        this.anchoAmarilla = '0'
        this.anchoVerdeClaro = '0'
        this.anchoVerdeOscuro = '0'
        this.horasNoIniciadas = 0;
        this.horasEnProgreso = 0;
        this.horasCompleatadas = 0;
        this.tareasOrg = [];
        this.tareasNoIniciadas = [];
        this.tareasEnProgreso = [];
        this.tareasCompletadas = [];
        this.noHayProyecto = false;
        this.organizarTareas();
        this.cargarTareas();
        this.poseeTareas();
        if (!this.noHayProyecto) {
          this.setearBarraProgreso();
          this.ordenarListas();
        }
      }
      else{
        this.anchoRojo = '0'
        this.anchoAmarilla = '0'
        this.anchoVerdeClaro = '0'
        this.anchoVerdeOscuro = '0'
        this.horasNoIniciadas = 0;
        this.horasEnProgreso = 0;
        this.horasEnPrueba = 0;
        this.horasCompleatadas = 0;
        this.horasTotales = 0;
        this.tareasOrg = [];
        this.tareasNoIniciadas = [];
        this.tareasEnProgreso = [];
        this.tareasCompletadas = [];
        console.log("entró 2" + this.anchoRojo, this.anchoAmarilla, this.anchoVerdeClaro)
        this.organizarTareas();
        this.cargarTareas();
        this.poseeTareas();
        if (!this.noHayProyecto) {
          this.setearBarraProgreso();
          this.ordenarListas();
        }
      }
      
    }
    else{
      this.tareasOrg = [];
      this.tareasNoIniciadas = [];
      this.tareasEnProgreso = [];
      this.tareasCompletadas = [];
      this.noHayProyecto = true;
    }
  }

  organizarTareas() {
    this.tareasSP.forEach((tarea: any) => {
      this.tareasOrg.push({
        idTarea: tarea.id_tarea,
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
    // this.tareasOrg.push({
    //   titulo: 'Tarea en Prueba XXX',
    //   proyecto: 'Visor',
    //   prioridad: 'Alta',
    //   asignado: 'ffriggeri',
    //   facilitador: 'ffriggeri',            // esta tarea es de esta pusheada para chequear el
    //   fechaInicio: '01-09-2022',           // comportamiento de la barra de tareas en prueba
    //   fechaFin: null,
    //   fechaPlanificacion: '31-09-2022',
    //   horasPlanificadas: 24,
    //   horasEjecutadas: 20,
    //   documento: null,
    //   tareasPrecondicion: null,
    //   notas: null,
    //   tipoTarea: 'Produccion',
    //   estado: 'In Testing',
    //   sprint: this.calcularSprint('31-09-2022')
    // });
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
    const respuesta: any[] = [];
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
      if(tarea.estado == "EnPrueba") {
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
      // divRojo.style.setProperty('width', (anchoVariable.toString()).concat(porc));
      //this.anchoRojo = (anchoVariable.toString()).concat(porc);
      this.anchoRojo = (this.cargarBarraRoja()).toString().concat(porc);
    }
    anchoVariable = (this.horasEnProgreso / this.horasTotales * 100);
    const divAmarillo = document.getElementById('barraAmarilla');
    if (divAmarillo != null) {
      // divAmarillo.style.setProperty('width', (anchoVariable.toString()).concat(porc));
      //this.anchoAmarilla = (anchoVariable.toString()).concat(porc);
      this.anchoAmarilla = (this.cargarBarraAmarilla()).toString().concat(porc);
    }
    anchoVariable = (this.horasEnPrueba / this.horasTotales * 100);
    const divVerdeClaro = document.getElementById('barraVerdeClaro');
    if (divVerdeClaro != null) {
      // divVerdeClaro.style.setProperty('width', (anchoVariable.toString()).concat(porc));
      //this.anchoVerdeClaro = (anchoVariable.toString()).concat(porc);
      this.anchoVerdeClaro = (this.cargarBarraVerdeClaro()).toString().concat(porc);
    }
    anchoVariable = (this.horasCompleatadas / this.horasTotales * 100);
    const divVerdeOscuro = document.getElementById('barraVerdeOscuro');
    if (divVerdeOscuro != null) {
      //divVerdeOscuro.style.setProperty('width', (anchoVariable.toString()).concat(porc));
      //this.anchoVerdeOscuro = (anchoVariable.toString()).concat(porc);
      this.anchoVerdeOscuro = (this.cargarBarraVerdeOscuro()).toString().concat(porc);
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
    this.tareasEnPrueba = this.ordenPrioridad(this.tareasEnPrueba);
    this.tareasCompletadas = this.ordenPrioridad(this.tareasCompletadas);
  }

  // Ordena una lista por orden alfabético
  ordenAlfabetico(lista: Array<any>) {
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
  ordenPrioridad(lista: Array<any>) {
    let arrayOrdenado: any[]=[];
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

  solicitudAyuda(tarea: any) {
    if (tarea.asignado === localStorage.getItem('usuario')) {
      if (this.tareasAyuda.length === 0) { 
        this.tareasAyuda.push({
          titulo: tarea.titulo,
          proyecto: tarea.proyecto,
          prioridad: tarea.prioridad,
          asignado: tarea.asignado,
          facilitador: tarea.facilitador,
          fechaInicio: tarea.fechaInicio,
          fechaFin: tarea.fechaFin,
          fechaPlanificacion: tarea.fechaPlanificacion,
          horasPlanificadas: tarea.horasPlanificadas,
          horasEjecutadas: tarea.horasEjecutadas,
          documento: tarea.documento,
          tareasPrecondicion: tarea.tareasPrecondicion,
          notas: tarea.notas,
          tipoTarea: tarea.tipoTarea,
          estado: tarea.estado,
          sprint: tarea.sprint,
          ayuda: false
        });
      } else {
        this.tareasAyuda.forEach(tar => {
          if (tar.titulo !== tarea.titulo) {
            this.tareasAyuda.push({
              titulo: tarea.titulo,
              ayuda: false
            });
          }
        });
      }
      return true;
    } else {
      return false;
    }
  }

  cambiarAyuda(tarea: any, valor: boolean) {
    this.tareasAyuda.forEach(tar => {
      if (tar.titulo === tarea.titulo) {
        tar.ayuda = valor;
      }
    });
  }

  chequearAyuda(tarea: any) {
    let result = false;
    this.tareasAyuda.forEach(tar => {
      if (tar.titulo === tarea.titulo && tar.ayuda === true) {
        result = true;
      }
    });
    return result;
  }

  filtrarAyuda() {
    if (this.filtroAyuda === true) {
      this.filtroAyuda = false;
      this.tareasEnProgreso = this.tareasEnProgresoAux;
    } else {
      this.filtroAyuda = true;
      this.tareasEnProgresoAux = this.tareasEnProgreso;
      this.tareasEnProgreso = [];
      this.tareasAyuda.forEach(tarea => {
        if (tarea.ayuda === true) {
          this.tareasEnProgreso.push(tarea);
        }
      });
    }
  }

  chequearFiltro() {
    return this.filtroAyuda;
  }

  abrirActividades(){
    this.panelActividadesAbierto= this.panelActividadesAbierto ? false : true;
  }

}