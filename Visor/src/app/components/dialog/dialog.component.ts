import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyectos } from 'src/app/interfaces/proyectos';
import { Tareas } from 'src/app/interfaces/tareas';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
// import 'moment/locale/ja';
// import 'moment/locale/fr';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { TareaService } from 'src/app/services/i2t/tarea.service';
import { finalize } from 'rxjs/operators';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FiltroService } from 'src/app/services/i2t/filtro.service';
import { Tarea } from 'src/app/interfaces/tarea';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface ProyectoService{
  id_projecto: string,
  id_usuario: string,
  nombre_cliente: string,
  nombre_projecto: string,
  numero_proyecto: number
  usuario_asignado: string
}
export interface PropiedadesProyecto{
  id: number,
  nombre: string, 
  planificadas: number
  noIniciadas: number,
  enProgreso: number,
  enPrueba: number, 
  completadas: number, 
  tieneTareasUsuario: boolean, 
  cliente: string, 
  asignadoA: string
}

export interface ResponseService{
  id_projecto: string;
  nombre_cliente: string;
  nombre_projecto: string;
  usuario_asignado: string;
}
export interface PropiedadesTarea{
  estado: string, 
  facilitador: string,
  fecha_fin: string, 
  fecha_inicio: string
  fecha_planificada: string,
  horas_ejecutadas: string,
  horas_planificadas: number,
  id_tarea: string
  nombre_documento: string
  nombre_proyecto: string,
  nombre_tarea: string 
  nota: string,
  prioridad: string
  tipo_tarea: string 
  usuario_asignado: string

}

export interface ContenidoFiltrosProyecto{
  id: string,
  nombre: string,
  cliente: string,
  asignado: string,
  asignadasAmi: boolean
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: []
})

export class DialogComponent implements OnInit {

  idProyectoSeleccionado: string = '';
  encodedData: string = '';
  contenido: ContenidoFiltrosProyecto = {id:'', nombre:'', cliente:'', asignado:'', asignadasAmi: false};
  filtrosAnteriores: ContenidoFiltrosProyecto = {id:'', nombre:'', cliente:'', asignado:'', asignadasAmi: false};
  saved_search_id: string = '';
  buscarProyecto: boolean = false;
  //filtrosProyectoDialog: any;
  prioridadProyecto:any
  proyectoSeleccionado: string = '';
  numeroProyecto: string = '';
  nombreProyecto: string = '';
  clienteProyecto: string = '';
  asignadasAmi: boolean = false;
  userId: string = '';
  userName: string = '';
  asignadoAproyecto: string = '';
  listaProyectosService: ProyectoService[] = [];
  listaProyectosAux: ProyectoService[] = [];
  clientesDeProyectos: String[] = [];
  usuariosDeProyectos: String[] = [];
  dataSourcePrueba!: MatTableDataSource<any>;
  dataSourcePruebaCopia!: MatTableDataSource<any>;
  result: PropiedadesProyecto[] = [];
  // valoresFiltros =  {
  //   id: '',
  //   nombre: '',
  //   cliente: '',
  //   asignado: '',
  //   asignadasAmi: false
  // }
  valoresFiltros: ContenidoFiltrosProyecto = {id:'', nombre:'', cliente:'', asignado:'', asignadasAmi: false};
  
  
  //filtrosAnterioresAux: Contenido = {id:'', nombre:'', cliente:'', asignado:'', asignadasAmi: false};

  listaTareasProyectos: PropiedadesTarea[] = [];
  listaTareasProyectosAux: PropiedadesTarea[] = [];
  contenido_tareas: Tareas = {buscaTareas: false, nombreTarea: '', prioridadTarea: '', facilitadorTarea: '', asignadoAtarea: '', tecnologiaTarea: '', idProyectoSeleccionado: '', inicioDesde: '', inicioHasta: '', planificadaDesde: '', planificadaHasta: '', finDesde: '', finHasta: ''};
  filtrosTarea: Tareas = {buscaTareas: false, nombreTarea: '', prioridadTarea: '', facilitadorTarea: '', asignadoAtarea: '', tecnologiaTarea: '', idProyectoSeleccionado: '', inicioDesde: '', inicioHasta: '', planificadaDesde: '', planificadaHasta: '', finDesde: '', finHasta: ''};
  filtrosAnterioresTarea: Tareas = {buscaTareas: false, nombreTarea: '', prioridadTarea: '', facilitadorTarea: '', asignadoAtarea: '', tecnologiaTarea: '', idProyectoSeleccionado: '', inicioDesde: '', inicioHasta: '', planificadaDesde: '', planificadaHasta: '', finDesde: '', finHasta: ''};
  dataSourceTareas!: MatTableDataSource<PropiedadesTarea>;
  prioridadDeTareas: String[] = [];
  facilitadoresTareas: String[] = [];
  usuariosAsignadosTareas: String[] = [];
  tecnologiasTareas: String[] = [];

  buscarTareas: boolean = false;
  //filtrosTareasDialog: any;
  //filtrosTarea: Object[] = [];
  nombreTarea = '';
  prioridadTarea: string = '';
  facilitadorTarea: string = ''
  asignadoAtarea :string = ''
  tecnologiaTarea: string = '';
  
  
  
  
  tecnologiatarea : any
  
  columnas: string[] = ['nombre'];
  //fechaInicio!: MatDatepickerInputEvent<any, any>;
  fechaInicio: string = ''
  //fechaFin!: MatDatepickerInputEvent<any, any>;
  fechaFin: string = '';
  fechaPlanificadaDesde: string = '';
  fechaPlanificadaHasta: string = '';
  fechaFinDesde: string = '';
  fechaFinHasta: string = '';
  saved_search_id_tareas:string = ''
  valorCheckbox:boolean = false;
  
  
  
  ngOnInit(): void {
    
  }

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public buscarProyectoInterface: Proyectos, @Inject(MAT_DIALOG_DATA) public buscarTareasInterface: Tareas, private _adapter: DateAdapter<any>,
  @Inject(MAT_DATE_LOCALE) private _locale: string, public dialogRef: MatDialogRef<DialogComponent>, private _tareaService: TareaService, private _filtroService: FiltroService) {
    
    
    //Pregunto si el modal se abrió para buscar PROYECTOS
    if(buscarProyectoInterface.buscaProyectos){
      this.buscarProyecto = buscarProyectoInterface.buscaProyectos;
      this.userId = localStorage.getItem("userId")!;
      this.userName = localStorage.getItem('usuario')!;

      //Obtengo proyectos desde servicio
      this._tareaService.getABMproyectoService().subscribe((response: any) => {
        this.listaProyectosService = response.dataset;
        this.listaProyectosAux = response.dataset;
        this.dataSourcePrueba = new MatTableDataSource(this.listaProyectosService);
         
        let cantProyectos = this.dataSourcePrueba.filteredData.length;
        for(let i = 0; i < cantProyectos ; i++){
          if(!this.clientesDeProyectos.includes(this.dataSourcePrueba.filteredData[i].nombre_cliente)){
            this.clientesDeProyectos.push( this.dataSourcePrueba.filteredData[i].nombre_cliente);
          }
        }
        for(let i = 0; i < cantProyectos ; i++){
          if(!this.usuariosDeProyectos.includes(this.dataSourcePrueba.filteredData[i].usuario_asignado)){
            this.usuariosDeProyectos.push( this.dataSourcePrueba.filteredData[i].usuario_asignado);
          }
        }

        this.ordenarAfabeticamente(this.clientesDeProyectos);
        this.ordenarAfabeticamente(this.usuariosDeProyectos);

        //Obtengo filtros desde BD
        this._filtroService.getUserId(this.userName).subscribe((response: any) => {
          localStorage.setItem('userId', response.dataset[0].id);

          this._filtroService.selectFiltro(this.userId, 'proyectos').subscribe(resp => {
            console.log(resp)
            if (resp.dataset.length != 0) {
              this.saved_search_id = resp.dataset[0].saved_search_id;
              this.contenido = JSON.parse(atob(resp.dataset[0].contenido)).filtros;
              console.log(this.contenido);


              this.filtrosAnteriores.id = this.contenido.id;
              this.filtrosAnteriores.nombre = this.contenido.nombre;
              this.filtrosAnteriores.cliente = this.contenido.cliente;
              this.filtrosAnteriores.asignado = this.contenido.asignado;
              this.filtrosAnteriores.asignadasAmi = this.contenido.asignadasAmi;


              this.valoresFiltros.id = this.contenido.id;
              this.valoresFiltros.nombre = this.contenido.nombre;
              this.valoresFiltros.cliente = this.contenido.cliente;
              this.valoresFiltros.asignado = this.contenido.asignado;
              this.valoresFiltros.asignadasAmi = this.contenido.asignadasAmi;

              //Set variables para mostrar valores en el dialog
              this.numeroProyecto = this.filtrosAnteriores.id;
              this.nombreProyecto = this.filtrosAnteriores.nombre;
              this.clienteProyecto = this.filtrosAnteriores.cliente;
              this.asignadoAproyecto = this.filtrosAnteriores.asignado;
              console.log(this.asignadasAmi)
              this.asignadasAmi = this.filtrosAnteriores.asignadasAmi

              
            }
            
            // const valores = Object.values(this.filtrosAnteriores);
            // this.armarFilterPredicateProyectos(valores);
            // this.filtrarProyectosPor(valores);

            this.prepararFiltroProyectos();


          })
        });
      });
    }
    
    //Pregunto si el pop up se abrió para buscar TAREAS
    
    if(buscarTareasInterface.buscaTareas){
      this.buscarTareas = buscarTareasInterface.buscaTareas;
      // this.filtrosTareasDialog = JSON.parse(JSON.stringify(this.buscarTareasInterface)).filtros;
      // this.nombreTarea = this.filtrosTareasDialog.nombreTarea;
      // this.prioridadTarea = this.filtrosTareasDialog.prioridadTarea;
      // this.facilitadorTarea = this.filtrosTareasDialog.facilitadorTarea;
       this.idProyectoSeleccionado = this.buscarTareasInterface.idProyectoSeleccionado;
      // this.asignadoAtarea = this.filtrosTareasDialog.asignadoAtarea;
      // this.tecnologiatarea = this.filtrosTareasDialog.tecnologiatarea;

    
      this._tareaService.getTareasDeProyecto(this.idProyectoSeleccionado).subscribe((response: any) => {
        this.listaTareasProyectos = response.dataset;
        
        
        this.dataSourceTareas = new MatTableDataSource(this.listaTareasProyectos);
        console.log(this.dataSourceTareas)
        this.listaTareasProyectosAux = this.listaTareasProyectos;

        let cantTareas = this.dataSourceTareas.filteredData.length;

        for(let i = 0; i < cantTareas ; i++){
          
          //Obtengo prioridades
          if(!this.prioridadDeTareas.includes(this.dataSourceTareas.filteredData[i].prioridad)){
            this.prioridadDeTareas.push( this.dataSourceTareas.filteredData[i].prioridad );
          }
          //Obtengo facilitadores
          if(!this.facilitadoresTareas.includes(this.listaTareasProyectos[i].facilitador)){
            this.facilitadoresTareas.push( this.listaTareasProyectos[i].facilitador);
          }
          //Obtengo usuarios asignados
          if(!this.usuariosAsignadosTareas.includes(this.listaTareasProyectos[i].usuario_asignado)){
            this.usuariosAsignadosTareas.push( this.listaTareasProyectos[i].usuario_asignado);
          }
          //Obtengo tecnologias
          // if(!this.tecnologiasTareas.includes(this.listaTareasProyectos[i].tecnologia)){
          //   this.tecnologiasTareas.push( this.listaTareasProyectos[i].tecnologia);
          // }
        }
        
        if(this._tareaService.asignadasAmi != ''){
          console.log("tareas service != vacío " + this._tareaService.asignadasAmi);
          this.asignadoAtarea = this._tareaService.asignadasAmi;
          console.log(this.asignadoAtarea)
        }

        //Obtengo filtros
        this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
          localStorage.setItem('userId', response.dataset[0].id);

          this._filtroService.selectFiltro(response.dataset[0].id, 'tareas').subscribe(resp => {
            console.log(resp)
            if (resp.dataset.length != 0) {
              this.saved_search_id_tareas = resp.dataset[0].saved_search_id;
              this.contenido_tareas = JSON.parse(atob(resp.dataset[0].contenido)).filtros;
              console.log(this.contenido_tareas);

              this.filtrosAnterioresTarea.nombreTarea = this.contenido_tareas.nombreTarea;
              this.filtrosAnterioresTarea.prioridadTarea = this.contenido_tareas.prioridadTarea;
              this.filtrosAnterioresTarea.facilitadorTarea = this.contenido_tareas.facilitadorTarea;
              this.filtrosAnterioresTarea.asignadoAtarea = this.contenido_tareas.asignadoAtarea;
              this.filtrosAnterioresTarea.tecnologiaTarea = '';
              this.filtrosAnterioresTarea.inicioDesde = this.contenido_tareas.inicioDesde;
              this.filtrosAnterioresTarea.inicioHasta = this.contenido_tareas.inicioHasta;
              this.filtrosAnterioresTarea.planificadaDesde = this.contenido_tareas.planificadaDesde;
              this.filtrosAnterioresTarea.planificadaHasta = this.contenido_tareas.planificadaHasta;
              this.filtrosAnterioresTarea.finDesde = this.contenido_tareas.finDesde;
              this.filtrosAnterioresTarea.finHasta = this.contenido_tareas.finHasta;

              //Set variables para mostrar valores en el dialog
              this.nombreTarea = this.filtrosAnterioresTarea.nombreTarea;
              this.prioridadTarea = this.filtrosAnterioresTarea.prioridadTarea;
              this.facilitadorTarea = this.filtrosAnterioresTarea.facilitadorTarea;
              this.asignadoAtarea = this.filtrosAnterioresTarea.asignadoAtarea;
              this.fechaInicio = this.filtrosAnterioresTarea.inicioDesde
              this.fechaFin = this.filtrosAnterioresTarea.inicioHasta
              this.fechaPlanificadaDesde = this.filtrosAnterioresTarea.planificadaDesde
              this.fechaPlanificadaHasta = this.filtrosAnterioresTarea.planificadaHasta
              this.fechaFinDesde = this.filtrosAnterioresTarea.finDesde
              this.fechaFinHasta = this.filtrosAnterioresTarea.finHasta

              //filtrosTarea = filtros actuales
              this.filtrosTarea.nombreTarea = this.contenido_tareas.nombreTarea;
              this.filtrosTarea.prioridadTarea = this.contenido_tareas.prioridadTarea;
              this.filtrosTarea.facilitadorTarea = this.contenido_tareas.facilitadorTarea;
              this.filtrosTarea.asignadoAtarea = this.contenido_tareas.asignadoAtarea;
              this.filtrosTarea.tecnologiaTarea = '';
              this.filtrosTarea.inicioDesde = this.contenido_tareas.inicioDesde;
              this.filtrosTarea.inicioHasta = this.contenido_tareas.inicioHasta;
              this.filtrosTarea.planificadaDesde = this.contenido_tareas.planificadaDesde;
              this.filtrosTarea.planificadaHasta = this.contenido_tareas.planificadaHasta;
              this.filtrosTarea.finDesde = this.contenido_tareas.finDesde;
              this.filtrosTarea.finHasta = this.contenido_tareas.finHasta;
            }
          })
        });

      });
    }

    this._locale = 'es';
    this._adapter.setLocale(this._locale);

  }

  
  ordenarAfabeticamente(arrayDatos: String[]){
    arrayDatos = arrayDatos.sort();
  }
  

  misProyectosAsignados(event: MatCheckboxChange){
    this.asignadasAmi = event.checked;
    this.valoresFiltros.asignadasAmi = this.asignadasAmi;
    this.prepararFiltroProyectos();
  }

  

  

  //Obtengo los datos para filtrar por PROYECTOS
  getDatosFiltrosProyecto(event: Event){ //Los inputs de filtro de proyectos
    const idParametroFiltro = (event.currentTarget as HTMLInputElement).id;
    const valorParametroFiltro = (event.currentTarget as HTMLInputElement).value;
    this.filtrarProyectos(idParametroFiltro,valorParametroFiltro);
  }
  public selectProyecto(select:MatSelectChange) {
    const id = select.source.id
    const valor = select.source.triggerValue
    console.log(id + valor)
    
    this.filtrarProyectos(id,valor);
  }
  filtrarProyectos(id:string,valor:string){
    const idParametroFiltro = id;
    var valorParametroFiltro = valor;
    
    //Swmitch servicio
    
    switch(idParametroFiltro){
      case 'nroProyecto':
        this.numeroProyecto = valorParametroFiltro;
        //this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;//Para permanencia de filtro
        this.valoresFiltros.id = valorParametroFiltro;
        const valores = Object.values(this.valoresFiltros)
        console.log(valores)
        const objeto = JSON.parse(JSON.stringify(this.valoresFiltros))
        
        this.prepararFiltroProyectos()
        //this.armarFilterPredicateProyectos(valores);
        //this.filtrarProyectosPor(valores);

        
      break;
      case 'nombreProyecto':
        this.nombreProyecto = valorParametroFiltro;
        //this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;//Para permanencia de filtro
        this.valoresFiltros.nombre = valorParametroFiltro.split(' ').join('').toLowerCase().toLowerCase();
        const valoresN = Object.values(this.valoresFiltros);

        this.prepararFiltroProyectos()
        //this.armarFilterPredicateProyectos(valoresN);
        //this.filtrarProyectosPor(valoresN);


      break;
      case 'clienteProyecto':
        this.clienteProyecto = valorParametroFiltro;
        //this.filtrosProyectoDialog[2] = this.clienteProyecto;
        this.valoresFiltros.cliente = valorParametroFiltro;
        const valoresC = Object.values(this.valoresFiltros);

        //this.armarFilterPredicateProyectos(valoresC);
        //this.filtrarProyectosPor(valoresC);
        this.prepararFiltroProyectos()
        
        
      break;
      case 'asignadoAproyecto':
        this.asignadoAproyecto = valorParametroFiltro;
        //this.filtrosProyectoDialog[3] = this.asignadoAproyecto;
        this.valoresFiltros.asignado = valorParametroFiltro;
        const valoresA = Object.values(this.valoresFiltros);

        //this.armarFilterPredicateProyectos(valoresA);
        //this.filtrarProyectosPor(valoresA);
        this.prepararFiltroProyectos()
        
      break;
    }
  }
   //Filtro de Proyectos
   prepararFiltroProyectos() {
    const filtroNumeroProyecto = this.filtroAvanzadoProyecto(1, this.valoresFiltros.id);
    const filtroNombreProyecto = this.filtroAvanzadoProyecto(2, this.valoresFiltros.nombre);
    const filtroclienteProyecto = this.filtroAvanzadoProyecto(3, this.valoresFiltros.cliente);
    const filtroAsignadoProyecto = this.filtroAvanzadoProyecto(4, this.valoresFiltros.asignado);
    if(this.asignadasAmi){
      this.valoresFiltros.asignadasAmi = this.asignadasAmi;
      const filtroAsignadoAmiProyecto = this.filtroAvanzadoProyecto(5, this.userId);
      this.listaTareasProyectosAux = this.buscarCoincidenciasProyectos(filtroNumeroProyecto, filtroNombreProyecto ,filtroclienteProyecto,filtroAsignadoProyecto,filtroAsignadoAmiProyecto);
    }
    else{
      this.valoresFiltros.asignadasAmi = this.asignadasAmi;
      const filtroAsignadoAmiProyecto = this.filtroAvanzadoProyecto(5, '');
      this.listaTareasProyectosAux = this.buscarCoincidenciasProyectos(filtroNumeroProyecto, filtroNombreProyecto ,filtroclienteProyecto,filtroAsignadoProyecto,filtroAsignadoAmiProyecto);
    }
    
    console.log(this.listaTareasProyectosAux)
  }

  filtroAvanzadoProyecto(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1: //Num proyecto
        this.listaProyectosAux.forEach(proyecto => {
          let obj = { id: proyecto.id_projecto, numero: proyecto.numero_proyecto };
          arrayTemp.push(obj);
          
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;

      case 2: //Nombre proyecto
        this.listaProyectosAux.forEach(proyecto => {
          let obj = { id: proyecto.id_projecto, nombre: proyecto.nombre_projecto };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;

      case 3: //Cliente proyecto
        this.listaProyectosAux.forEach(proyecto => {
          let obj = { id: proyecto.id_projecto, cliente: proyecto.nombre_cliente };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;

      case 4: //Asignado a
        this.listaProyectosAux.forEach(proyecto => {
          let obj = { id: proyecto.id_projecto, asignadoA: proyecto.usuario_asignado };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;

      case 5: //Mis proyectos
        
        this.listaProyectosAux.forEach(proyecto => {
          let obj = { id: proyecto.id_projecto, idUsuario: proyecto.id_usuario };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;
    }

  }

  buscarCoincidenciasProyectos(filtroNumeroProyecto: Array<{}>, filtroNombreProyecto: Array<{}>,filtroClienteProyecto: Array<{}>, filtroAsignadoProyecto: Array<{}>, filtroAsignadoAmiProyecto:Array<{}>){
    let encontrados: any = [];
    

    this.listaProyectosAux.forEach(proyecto => {
      let encontradoIdProyecto = false;
      let encontradoNombreProyecto = false;
      let encontradoClienteProyecto = false;
      let encontradoAsignadoProyecto = false;
      let asigandosAmi = false;
      
      
      filtroNumeroProyecto.forEach((element: any) => {
        if (proyecto.id_projecto == element.id) {
          encontradoIdProyecto = true;
        }
      });

      filtroNombreProyecto.forEach((element: any) => {
        if (proyecto.id_projecto == element.id) {
          encontradoNombreProyecto = true;
        }
      });

      filtroClienteProyecto.forEach((element: any) => {
        
        if (proyecto.id_projecto == element.id) {
          encontradoClienteProyecto = true;
        }
      });

      filtroAsignadoProyecto.forEach((element: any) => {
        
        if (proyecto.id_projecto == element.id) {
          encontradoAsignadoProyecto = true;
        }
      });

      if (encontradoIdProyecto && encontradoNombreProyecto && encontradoClienteProyecto && encontradoAsignadoProyecto) {
        encontrados.push(proyecto);
      }
      

    });
    
    if(this.asignadasAmi){
      if(encontrados.length != 0){
        console.log(encontrados)
        encontrados = encontrados.filter((unEncontrado:any) =>
          unEncontrado.id_usuario == this.userId
          
        );
        
        return encontrados;
      }
    }
    else{
      return encontrados;
    }
  }
  armarFilterPredicateProyectos( valores:string[] ): boolean{                                    
    let respuesta: any;
    respuesta = this.dataSourcePrueba.filterPredicate = (data: any, filter: string): boolean => {
      //Filtra solo por numero_proyecto
      if(valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] == ''){
        return ( (String(data.numero_proyecto).split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1);
      }

      //Filtra solo por nombre_projecto
      else if(valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] == ''){
        return ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1);
      }

      //Filtra solo por Cliente
      else if(valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] == ''){
        return ( data.nombre_cliente == valores[2] );
      }

      //Filtra solo por Asignado
      else if(valores[0] == '' && valores[1] == '' && valores[2] == '' && valores[3] != ''){
        return ( data.usuario_asignado == valores[3] );
      }

      //Filtra por Cliente y Asignado
      else if(valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] != ''){
        return ( (data.nombre_cliente == valores[2]) &&  (data.usuario_asignado == valores[3]) );
      }
      //Filtra por Nombre y Asignado
      else if(valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] != ''){
        return ( ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1 ) &&  (data.usuario_asignado == valores[3]) );
      }
      //Filtra por Nombre y Cliente
      else if(valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] == ''){
        return ( ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) &&  (data.nombre_cliente == valores[2]) );
      }
      //Filtra por Nombre, Cliente y Asignado
      else if(valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] != ''){
        return ( ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) && (data.nombre_cliente == valores[2]) && (data.usuario_asignado == valores[3])  );
      }
      //Filtra por numero_proyecto y Asignado
      else if(valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] != ''){
        return ( ((String(data.numero_proyecto).split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && (data.usuario_asignado == valores[3])  );
      }
      //Filtra por numero_proyecto y Cliente
      else if(valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] == ''){
        return ( (String(data.numero_proyecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && (data.nombre_cliente == valores[2])  );
      }
      //Filtra por numero_proyecto, Cliente y Asignado
      else if(valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] != ''){
        return ( (String(data.numero_proyecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && (data.nombre_cliente == valores[2]) && (data.usuario_asignado == valores[3])  );
      }
      //numero_proyecto y Nombre
      else if(valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[3] == ''){
        console.log("aca")
        return ( ((String(data.numero_proyecto).split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1])) != -1 );
      }
      //Filtra por numero_proyecto, Nombre y Asignado
      else if(valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[2] != ''){
        return ( ((data.numero_proyecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) && (String(data.usuario_asignado) == (valores[3])) );
      }
      //Filtra numero_proyecto, Nombre y Cliente
      else if(valores[0] != '' && valores[1] != '' && valores[2] != '' && valores[3] == ''){
        return ( ((data.numero_proyecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) && (data.nombre_cliente == valores[2])  );
      }
      //numero_proyecto, Nombre, Cliente y Asignado
      else{
        return ( ((data.numero_proyecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1]) != -1) &&  (data.nombre_cliente == valores[2]) && (data.usuario_asignado) == valores[3]    );                                                                                                ;
      }
      
    }
    return respuesta;
  }

  filtrarProyectosPor(valores:string[]){
    if (valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      
    }

    //Filtra solo por nombre_projecto
    else if (valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
    }

    //Filtra solo por Cliente
    else if (valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
    }

    //Filtra solo por Asignado
    else if (valores[0] == '' && valores[1] == '' && valores[2] == '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }

    //Filtra por Cliente y Asignado
    else if (valores[0] == '' && valores[1] == '' && valores[2] != '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
    //Filtra por Nombre y Asignado
    else if (valores[0] == '' && valores[1] != '' && valores[2] == '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
    //Filtra por Nombre y Cliente
    else if (valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
    }
    //Filtra por Nombre, Cliente y Asignado
    else if (valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();

    }
    //Filtra por numero_proyecto y Asignado
    else if (valores[0] != '' && valores[1] == '' && valores[2] == '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
    //Filtra por numero_proyecto y Cliente
    else if (valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
    }
    //Filtra por numero_proyecto, Cliente y Asignado
    else if (valores[0] != '' && valores[1] == '' && valores[2] != '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();

    }
    //numero_proyecto y Nombre
    else if (valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[3] == '') {
      console.log(this.dataSourcePrueba)
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
    }
    //Filtra por numero_proyecto, Nombre y Asignado
    else if (valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[2] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();

    }
    //Filtra numero_proyecto, Nombre y Cliente
    else if (valores[0] != '' && valores[1] != '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();

    }
    else {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.split(' ').join('').toLowerCase().trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
  }

  getProyecto(proyecto:any):void{
   
    this.proyectoSeleccionado = proyecto.nombre_projecto;
    this.nombreProyecto = this.proyectoSeleccionado
    
    const valoresFiltrosActuales = Object.values(this.valoresFiltros);
    console.log("Filtros actuales: " + valoresFiltrosActuales);
    const valoresFiltrosAnteriores = Object.values(this.filtrosAnteriores);
    console.log("Filtros anteriores: " + valoresFiltrosAnteriores);

    //Pregunto si ya había filtros
    let habiaFiltros = false;
    let hayCambios = false;

    for(let i= 0; i < valoresFiltrosAnteriores.length; i++){
      if(valoresFiltrosAnteriores[i] != ''){
        habiaFiltros = true;
        i = valoresFiltrosAnteriores.length;
      }
    }

    //Comparo filtros anteriores con los actuales
    for(let i = 0; i < valoresFiltrosActuales.length; i++){
      console.log("valoresFiltrosActuales[i]: " , valoresFiltrosActuales[i] ," valoresFiltrosAnteriores[i]: " ,valoresFiltrosAnteriores[i] , " : " , valoresFiltrosActuales[i] != valoresFiltrosAnteriores[i]  );
      if(valoresFiltrosActuales[i] != valoresFiltrosAnteriores[i]){
        hayCambios = true;
        i = valoresFiltrosAnteriores.length;
      }
    }

    console.log(this.valoresFiltros)
    if(habiaFiltros){ //Pregunta si había filtros anteriormente cargados
      if(hayCambios){
        //Update de filtros
        console.log("update")
        const contenido: string = JSON.stringify({ filtros : this.valoresFiltros });
        
        const encodedData = btoa(contenido);
        this._filtroService.updateFiltro(this.saved_search_id, encodedData).subscribe((rsp: any) => {
          console.log('Filtro actualizado: ', rsp);
        });
      }
      else{
        console.log("Había filtros proyecto pero no hubo cambios")
      }
      
    }
    else{
      let insertFiltro: boolean = false;
      for (let i = 0; i < valoresFiltrosActuales.length; i++) {
        if (valoresFiltrosActuales[i] != '') {
          insertFiltro = true;
          i = valoresFiltrosActuales.length;
        }
      }
      if (insertFiltro) {
        //Insert de servicio
        console.log("insert");
        const contenido: string = JSON.stringify({ filtros: this.valoresFiltros });
        const encodedData = btoa(contenido);
        this._filtroService.insertFiltro(
          localStorage.getItem('userId')!,
          'proyectos', //modulo_busqueda
          'filtro_proyectos', //nombre
          encodedData,//contenido

          'Actualiza filtros de búsqueda de proyectos').subscribe((rsp: any) => {
            console.log('Filtro guardado: ', rsp);
          });
      }
      
    }
    
    this.dialogRef.close(proyecto);
    
  }

  getAsignadoAProyecto(programador: any){
    this.asignadoAproyecto = programador;
  }
  

  //Obtengo los datos para filtrar por tarea
  getNombreTarea(event: Event){
    this.nombreTarea = (event.currentTarget as HTMLInputElement).value;
    this.filtrosTarea.nombreTarea = this.nombreTarea;
  }

  selectPrioridadTarea(select:MatSelectChange){
    this.prioridadTarea = select.source.triggerValue;
    this.filtrosTarea.prioridadTarea = this.prioridadTarea;
  }

  selectFacilitadorTarea(select:MatSelectChange){
    this.facilitadorTarea = select.source.triggerValue;
    this.filtrosTarea.facilitadorTarea = this.facilitadorTarea;
  }

  selectAsignadoAtarea(select:MatSelectChange){
    this.asignadoAtarea = select.source.triggerValue;
    this.filtrosTarea.asignadoAtarea = this.asignadoAtarea;
  }

  selectTecnologiaTarea(select:MatSelectChange){
    this.tecnologiaTarea = select.source.triggerValue;
    this.filtrosTarea.tecnologiaTarea = this.tecnologiaTarea;
  }

  

  getFechaInicio(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaInicio= fechaJson.split('T')[0];
    this.filtrosTarea.finDesde = this.fechaInicio
    
  }

  getFechaFin(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaFin = fechaJson.split('T')[0];
    this.filtrosTarea.finHasta = this.fechaFin;
  }

  getPlanificadaDesde(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaPlanificadaDesde = fechaJson.split('T')[0];
    this.filtrosTarea.planificadaDesde = this.fechaPlanificadaDesde;
  }
  getPlanificadaHasta(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaPlanificadaHasta = fechaJson.split('T')[0];
    this.filtrosTarea.planificadaHasta = this.fechaPlanificadaHasta;
  }
  getFinDesde(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaFinDesde = fechaJson.split('T')[0];
    this.filtrosTarea.finDesde = this.fechaFinDesde
  }
  getFinHasta(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaFinHasta = fechaJson.split('T')[0];
    this.filtrosTarea.finHasta = this.fechaFinHasta
  }

  

  //Filtro de Tareas
  prepararFiltro() {
    const filtroNombreTarea = this.filtroAvanzado(1, this.nombreTarea);
    const filtroPrioridad = this.filtroAvanzado(2, this.prioridadTarea);
    const filtroFacilitador = this.filtroAvanzado(3, this.facilitadorTarea);
    const filtroAsignadoA = this.filtroAvanzado(4, this.asignadoAtarea);
    //const filtroTecnologia = this.filtroAvanzado(5, this.tecnologiaTarea);
    const filtroFechaInicioDesde = this.filtroAvanzado(6, this.fechaInicio);
    const filtroFechaInicioHasta = this.filtroAvanzado(7, this.fechaFin);
    const filtroPlanificadaDesde = this.filtroAvanzado(8, this.fechaPlanificadaDesde);
    const filtroPlanificadaHasta = this.filtroAvanzado(9, this.fechaPlanificadaHasta);
    const filtroFinDesde = this.filtroAvanzado(10, this.fechaFinDesde);
    const filtroFinHasta = this.filtroAvanzado(11, this.fechaFinHasta);
    
    
    this.listaTareasProyectosAux = this.buscarCoincidencias(filtroNombreTarea, filtroPrioridad ,filtroFacilitador,filtroAsignadoA,filtroFechaInicioDesde,filtroFechaInicioHasta,filtroPlanificadaDesde,filtroPlanificadaHasta,filtroFinDesde,filtroFinHasta);
    
    console.log("Resultado filtro tarea")
    console.log(this.listaTareasProyectosAux);

    this.guardarValoresFiltrosTarea();
    this.dialogRef.close(this.listaTareasProyectosAux);
  }

  filtroAvanzado(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1: //nombreTarea
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, nombre: tarea.nombre_tarea };
          arrayTemp.push(obj);
          
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filterPredicate = (arrayTabla: any, valor: string): boolean => {
          return ((arrayTabla.nombre.split(' ').join('').toLowerCase()).indexOf(valor) != -1)
        }
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;

      case 2: //Prioridad
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, prioridad: tarea.prioridad };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;

      case 3: //Facilitador
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, facilitador: tarea.facilitador };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;

      case 4: //Asignado a
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, asignadoA: tarea.usuario_asignado };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;

      case 6: //Fecha inicio desde
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, fechaInicioDesde: tarea.fecha_inicio };
          arrayTemp.push(obj);
        });

        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filterPredicate = (arrayTabla: any, valor: string): boolean => {
          return ( arrayTabla.fechaInicioDesde >= valor )
        }
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData
        return arrayTemp;

      case 7: //Fecha inicio hasta
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, fechaInicioHasta: tarea.fecha_inicio };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);


        arrayTabla.filterPredicate = (arrayTabla: any, valor: string): boolean => {
          return (arrayTabla.fechaInicioHasta <= valor)
        }
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;

      case 8: //Fecha Planificada Desde
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, fechaPlanificadaDesde: tarea.fecha_planificada };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);


        arrayTabla.filterPredicate = (arrayTabla: any, valor: string): boolean => {
          return (arrayTabla.fechaPlanificadaDesde.trim() >= valor.trim())
        }
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;

      case 9: //Fecha Planificada Hasta
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, fechaPlanificadaHasta: tarea.fecha_planificada };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);


        arrayTabla.filterPredicate = (arrayTabla: any, valor: string): boolean => {
          return (arrayTabla.fechaPlanificadaHasta.trim() <= valor.trim())
        }
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;
    
      case 10: //Fecha Fin Desde
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, fechaFinDesde: tarea.fecha_fin };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);


        arrayTabla.filterPredicate = (arrayTabla: any, valor: string): boolean => {
          return (arrayTabla.fechaFinDesde >= valor)
        }
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;
        
      case 11: //Fecha Fin Hasta
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, fechaFinHasta: tarea.fecha_fin };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);


        arrayTabla.filterPredicate = (arrayTabla: any, valor: string): boolean => {
          console.log(valor)
          return (arrayTabla.fechaFinHasta <= valor)
        }
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
      return arrayTemp;
    }

  }

  buscarCoincidencias(arrayNombre: any, arrPrioridad:any, arrayFacilitador: any, arrAsignado:any, filtroFechaInicioDesde:any ,filtroFechaInicioHasta:any, filtroFechaPlanificadaDesde:any, filtroFechaPlanificadaHasta:any, filtroFechaFinDesde:any, filtroFechaFinHasta:any) {
    let encontrados: any = [];
    console.log(filtroFechaInicioDesde)
    console.log(filtroFechaInicioHasta)

    this.listaTareasProyectosAux.forEach(tarea => {
      let encontradoNombre = false;
      let encontradoPrioridad = false;
      let encontradoFacilitador = false;
      let encontradoAsignado = false;
      let encontradoFechaInicioDesde = false;
      let encontradoFechaInicioHasta = false;
      let encontradoFechaPlanificadaDesde = false;
      let encontradoFechaPlanificadaHasta = false;
      let encontradoFechaFinDesde = false;
      let encontradoFechaFinHasta = false;
      
      arrayNombre.forEach((element: any) => {
        if (tarea.id_tarea == element.id) {
          encontradoNombre = true;
        }
      });

      arrPrioridad.forEach((element: any) => {
        if (tarea.id_tarea == element.id) {
          encontradoPrioridad = true;
        }
      });

      arrayFacilitador.forEach((element: any) => {
        
        if (tarea.id_tarea == element.id) {
          encontradoFacilitador = true;
        }
      });

      arrAsignado.forEach((element: any) => {
        
        if (tarea.id_tarea == element.id) {
          encontradoAsignado = true;
        }
      });

      filtroFechaInicioDesde.forEach((element: any) => {
        
        if (tarea.id_tarea == element.id) {
          encontradoFechaInicioDesde = true;
        }
      });

      filtroFechaInicioHasta.forEach((element: any) => {
        if (tarea.id_tarea == element.id) {
          encontradoFechaInicioHasta = true;
        }
      });

      filtroFechaPlanificadaDesde.forEach((element: any) => { 
        if (tarea.id_tarea == element.id) {
          encontradoFechaPlanificadaDesde = true;
        }
      });

      filtroFechaPlanificadaHasta.forEach((element: any) => { 
        if (tarea.id_tarea == element.id) {
          encontradoFechaPlanificadaHasta = true;
        }
      });
      filtroFechaFinDesde.forEach((element: any) => { 
        if (tarea.id_tarea == element.id) {
          encontradoFechaFinDesde = true;
        }
      });
      filtroFechaFinHasta.forEach((element: any) => { 
        if (tarea.id_tarea == element.id) {
          encontradoFechaFinHasta = true;
        }
      });
      
      if (encontradoNombre && encontradoPrioridad && encontradoFacilitador && encontradoAsignado && encontradoFechaInicioDesde && encontradoFechaInicioHasta && encontradoFechaPlanificadaDesde && encontradoFechaPlanificadaHasta && encontradoFechaFinDesde && encontradoFechaFinHasta ) {
        encontrados.push(tarea);
      }
    });
    
    return encontrados;
  }


  guardarValoresFiltrosTarea():void{
    
    const valoresFiltrosActuales = Object.values(this.filtrosTarea);
    console.log("Filtros actuales: " + valoresFiltrosActuales);
    const valoresFiltrosAnteriores = Object.values(this.filtrosAnterioresTarea);
    console.log("Filtros anteriores: " + valoresFiltrosAnteriores);

    //Pregunto si ya había filtros
    let habiaFiltros = false;
    let hayCambios = false;

    for(let i= 0; i < valoresFiltrosAnteriores.length; i++){
      if(valoresFiltrosAnteriores[i] != ''){
        console.log("entró")
        habiaFiltros = true;
        i = valoresFiltrosAnteriores.length;
      }
    }

    //Comparo filtros anteriores con los actuales
    for(let i = 0; i < valoresFiltrosActuales.length; i++){
      console.log("valoresFiltrosActuales[i]: " , valoresFiltrosActuales[i] ," valoresFiltrosAnteriores[i]: " ,valoresFiltrosAnteriores[i] , " : " , valoresFiltrosActuales[i] != valoresFiltrosAnteriores[i]  );
      if(valoresFiltrosActuales[i] != valoresFiltrosAnteriores[i]){
        hayCambios = true;
        i = valoresFiltrosAnteriores.length;
      }
    }

    if(habiaFiltros){ //Pregunta si había filtros anteriormente cargados
      if(hayCambios){
        //Update de filtros
        console.log("update")
        const contenido: string = JSON.stringify({ filtros : this.filtrosTarea });
        const encodedData = btoa(contenido);
        this._filtroService.updateFiltro(this.saved_search_id_tareas, encodedData).subscribe((rsp: any) => {
          console.log('Filtro actualizado: ', rsp);
        });
      }
      else{

      }
      
    }
    else{
      let insertFiltro: boolean = false;
      for (let i = 0; i < valoresFiltrosActuales.length; i++) {
        if (valoresFiltrosActuales[i] != '') {
          insertFiltro = true;
          i = valoresFiltrosActuales.length;
        }
      }
      if (insertFiltro) {
        //Insert de servicio
        console.log("insert");
        console.log(this.filtrosTarea)
        const contenido: string = JSON.stringify({ filtros: this.filtrosTarea });
        const encodedData = btoa(contenido);
        this._filtroService.insertFiltro(
          localStorage.getItem('userId')!,
          'tareas', //modulo_busqueda
          'filtro_tareas', //nombre
          encodedData,//contenido
          'Actualiza filtros de búsqueda de tareas').subscribe((rsp: any) => {
            console.log('Filtro guardado: ', rsp);
          });
      }
    }
    
    this.dialogRef.close();
  }

  getFacilitadorTarea(facilitador:any){
    this.facilitadorTarea = facilitador;
    console.log(this.facilitadorTarea);
  }

  

  french() {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);

  }

  getDateFormatString(): string {
    
    if (this._locale === 'ja-JP') {
      return 'YYYY/MM/DD';
      
    } else if (this._locale === 'fr') {
      return 'DD/MM/YYYY';
    }
    return '';
  }
  

  limpiarValoresDeFiltros(){
    
    if(this.buscarProyecto){
      if(this.saved_search_id != ''){

        this._filtroService.deleteFiltro(this.saved_search_id).subscribe((rsp: any) => {
            console.log('Filtros borrados: ', rsp);
        });
      }
      this.dialogRef.close();
    }
    else{
      if(this.saved_search_id_tareas != ''){
        console.log(this.saved_search_id_tareas)
        this._filtroService.deleteFiltro(this.saved_search_id_tareas).subscribe((rsp: any) => {
            console.log('Filtros borrados: ', rsp);
        });
      }
      this.dialogRef.close();
    }
  }

  cerrarDialog(){
    if(this.buscarProyecto){
      //this.dialogRef.close(this.filtrosProyectoDialog);
      this.dialogRef.close();
    }
    else{
      this.dialogRef.close();
    }
  }

}
