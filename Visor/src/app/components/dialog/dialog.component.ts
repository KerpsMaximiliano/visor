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

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [
  ]
})

export class DialogComponent implements OnInit {

  buscarProyecto: boolean = false;
  filtrosProyectoDialog: any;
  prioridadProyecto:any
  proyectoSeleccionado: string = '';
  numeroProyecto: string = '';
  nombreProyecto: string = '';
  clienteProyecto: string = '';
  
  asignadoAproyecto: string = '';
  listaProyectos: any[] = [];
  listaProyectosPrueba: any;
  listaTareasProyectos: PropiedadesTarea[] = [];
  listaTareasProyectosAux: PropiedadesTarea[] = [];
  dataSource: MatTableDataSource<PropiedadesProyecto>;
  clientesDeProyectos: String[] = [];
  usuariosDeProyectos: String[] = [];
  dataSourcePrueba!: MatTableDataSource<any>;
  result: PropiedadesProyecto[] = [];
  valoresFiltros =  {
    id: '',
    nombre: '',
    cliente: '',
    asignado: ''
  }

  dataSourceTareas!: MatTableDataSource<PropiedadesTarea>;
  prioridadDeTareas: String[] = [];
  facilitadoresTareas: String[] = [];
  usuariosAsignadosTareas: String[] = [];
  tecnologiasTareas: String[] = [];

  buscarTareas: boolean = false;
  filtrosTareasDialog: any;
  filtrosTarea: Object[] = [];
  nombreTarea = '';
  prioridadTarea: string = '';
  facilitadorTarea: string = ''
  asignadoAtarea :string = ''
  tecnologiaTarea: string = '';
  
  
  idProyectoSeleccionado: string = ''
  
  tecnologiatarea : any
  
  columnas: string[] = ['nombre'];

  ngOnInit(): void {
    
  }

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public buscarProyectoInterface: Proyectos, @Inject(MAT_DIALOG_DATA) public buscarTareasInterface: Tareas, private _adapter: DateAdapter<any>,
  @Inject(MAT_DATE_LOCALE) private _locale: string, public dialogRef: MatDialogRef<DialogComponent>, private _tareaService: TareaService) {
    
    
    //Pregunto si el pop up se abrió para buscar PROYECTOS
    if(buscarProyectoInterface.buscaProyectos){
      this.buscarProyecto = buscarProyectoInterface.buscaProyectos;
      this.filtrosProyectoDialog = this.buscarProyectoInterface.filtros;
      
      if (buscarProyectoInterface.filtros.length != 0) {
        this.numeroProyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[0])).numeroProyecto;
        this.nombreProyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[1])).nombreProyecto;
        this.clienteProyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[2])).clienteProyecto;
        this.asignadoAproyecto = JSON.parse(JSON.stringify(buscarProyectoInterface.filtros[3])).asignadoAproyecto;
      }

      this._tareaService.getABMproyectoService().subscribe((response: any) => {
        this.listaProyectosPrueba = response.dataset;
        console.log(this.listaProyectosPrueba)
        this.dataSourcePrueba = new MatTableDataSource(this.listaProyectosPrueba);
        
         
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
        
        


      });
    }
    
    //Pregunto si el pop up se abrió para buscar TAREAS
    
    if(buscarTareasInterface.buscaTareas){
      this.buscarTareas = buscarTareasInterface.buscaTareas;
      this.filtrosTareasDialog = JSON.parse(JSON.stringify(this.buscarTareasInterface)).filtros;
      this.nombreTarea = this.filtrosTareasDialog.nombreTarea;
      this.prioridadTarea = this.filtrosTareasDialog.prioridadTarea;
      this.facilitadorTarea = this.filtrosTareasDialog.facilitadorTarea;
      this.idProyectoSeleccionado = this.filtrosTareasDialog.idProyectoSeleccionado;
      this.asignadoAtarea = this.filtrosTareasDialog.asignadoAtarea;
      this.tecnologiatarea = this.filtrosTareasDialog.tecnologiatarea;

      
      this._tareaService.getTareasDeProyecto(this.idProyectoSeleccionado).subscribe((response: any) => {
        this.listaTareasProyectos = response.dataset;
        
        
        this.dataSourceTareas = new MatTableDataSource(this.listaTareasProyectos);
        console.log(this.dataSourceTareas)
        this.listaTareasProyectosAux = this.listaTareasProyectos

        // this.listaTareasProyectos.forEach((unaTarea)=>{
        //   this.listaTareasProyectosAux.push(unaTarea)
        // })
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
        console.log(this.facilitadoresTareas)
        
        
        if(this._tareaService.asignadasAmi != ''){
          console.log("tareas service != vacío " + this._tareaService.asignadasAmi);
          this.asignadoAtarea = this._tareaService.asignadasAmi;
          console.log(this.asignadoAtarea)
        }

      });
      
      
      
      console.log(this.filtrosTareasDialog)

      //this.nombreTarea = JSON.parse(JSON.stringify(this.filtrosTareasDialog[0])).nombreTarea;
      
    }

    this._locale = 'es';
    this._adapter.setLocale(this._locale);
    
        
    const proyectos: PropiedadesProyecto[] = [
      { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0, tieneTareasUsuario: false, cliente: 'Cliente 1', asignadoA: 'Adrian Enrico' },
      { id: 125039, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 124132, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
      { id: 888886, nombre: 'Visorrr - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: true, cliente: 'Federico Gauchat', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 144, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' }
    ]
    this.listaProyectos = proyectos;
    //console.log(this.listaProyectosPrueba)
    
    this.dataSource = new MatTableDataSource(this.listaProyectos);
    
    //this.dataSource = new MatTableDataSource(this.listaProyectosPrueba);
    
    

  }
  
  
  toppings = this._formBuilder.group({
    misProyectos: false,
    extracheese: false,
    mushroom: false,
  });

  
  
  //Filtra prueba
  // filtrarProyectos(id:string,valor:string){
  //   const idParametroFiltro = id;
  //   var valorParametroFiltro = valor;
  //   console.log(idParametroFiltro)
  //   console.log(valorParametroFiltro)
    
    
  //   switch(idParametroFiltro){
  //     case 'nroProyecto':
  //       this.numeroProyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;//Para permanencia de filtro
  //       this.valoresFiltros.id = valorParametroFiltro;
  //       const valores = Object.values(this.valoresFiltros)
        
  //       this.armarFilterPredicate(valores);
  //       this.filtrarPor(valores);
        
        
  //     break;
  //     case 'nombreProyecto':
  //       this.nombreProyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;//Para permanencia de filtro
  //       this.valoresFiltros.nombre = valorParametroFiltro;
  //       const valoresN = Object.values(this.valoresFiltros)

  //       this.armarFilterPredicate(valoresN);
  //       this.filtrarPor(valoresN);
        
  //     break;
  //     case 'clienteProyecto':
  //       this.clienteProyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[2] = this.clienteProyecto;
  //       this.valoresFiltros.cliente = valorParametroFiltro;
  //       const valoresC = Object.values(this.valoresFiltros);

  //       this.armarFilterPredicate(valoresC);
  //       this.filtrarPor(valoresC);
        
  //       break;
  //     case 'asignadoAproyecto':
  //       this.asignadoAproyecto = valorParametroFiltro;
  //       this.filtrosProyectoDialog[3] = this.asignadoAproyecto;
  //       this.valoresFiltros.asignado = valorParametroFiltro;
  //       const valoresA = Object.values(this.valoresFiltros)

  //       this.armarFilterPredicate(valoresA);
  //       this.filtrarPor(valoresA);
  //   }
  // }

  //Obtengo los datos para filtrar por PROYECTOS
  getDatosFiltrosProyecto(event: Event){ //Los inputs
    const idParametroFiltro = (event.currentTarget as HTMLInputElement).id;
    const valorParametroFiltro = (event.currentTarget as HTMLInputElement).value;
    this.filtrarProyectos(idParametroFiltro,valorParametroFiltro);
    console.log("Llama")
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
    console.log(idParametroFiltro)
    console.log(valorParametroFiltro)
    
    //Swmitch servicio
    
    switch(idParametroFiltro){
      case 'nroProyecto':
        this.numeroProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;//Para permanencia de filtro
        this.valoresFiltros.id = valorParametroFiltro;
        const valores = Object.values(this.valoresFiltros)
        console.log(valores)
        const objeto = JSON.parse(JSON.stringify(this.valoresFiltros))
        
        this.armarFilterPredicateProyectos(valores);
        this.filtrarProyectosPor(valores);
        
      break;
      case 'nombreProyecto':
        this.nombreProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;//Para permanencia de filtro
        this.valoresFiltros.nombre = valorParametroFiltro;
        const valoresN = Object.values(this.valoresFiltros);


        this.armarFilterPredicateProyectos(valoresN);
        this.filtrarProyectosPor(valoresN);

      break;
      case 'clienteProyecto':
        this.clienteProyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[2] = this.clienteProyecto;
        this.valoresFiltros.cliente = valorParametroFiltro;
        const valoresC = Object.values(this.valoresFiltros);

        this.armarFilterPredicateProyectos(valoresC);
        this.filtrarProyectosPor(valoresC);

        
      break;
      case 'asignadoAproyecto':
        this.asignadoAproyecto = valorParametroFiltro;
        this.filtrosProyectoDialog[3] = this.asignadoAproyecto;
        this.valoresFiltros.asignado = valorParametroFiltro;
        const valoresA = Object.values(this.valoresFiltros);

        this.armarFilterPredicateProyectos(valoresA);
        this.filtrarProyectosPor(valoresA);

        
      break;
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
        return ( ((data.numero_proyecto.split(' ').join('').toLowerCase()).indexOf(valores[0]) != -1) && ((String(data.nombre_projecto).split(' ').join('').toLowerCase()).indexOf(valores[1])) != -1 );
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
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
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
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
    //Filtra por Nombre y Cliente
    else if (valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
    }
    //Filtra por Nombre, Cliente y Asignado
    else if (valores[0] == '' && valores[1] != '' && valores[2] != '' && valores[3] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
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
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
    }
    //Filtra por numero_proyecto, Nombre y Asignado
    else if (valores[0] != '' && valores[1] != '' && valores[2] == '' && valores[2] != '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();

    }
    //Filtra numero_proyecto, Nombre y Cliente
    else if (valores[0] != '' && valores[1] != '' && valores[2] != '' && valores[3] == '') {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();

    }
    else {
      this.dataSourcePrueba.filter = this.valoresFiltros.id.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.nombre.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.cliente.trim().toLowerCase();
      this.dataSourcePrueba.filter = this.valoresFiltros.asignado.trim().toLowerCase();
    }
  }

  //Obtengo los datos para filtrar por tarea
  getNombreTarea(event: Event){
    this.nombreTarea = (event.currentTarget as HTMLInputElement).value;
  }

  selectPrioridadTarea(select:MatSelectChange){
    this.prioridadTarea = select.source.triggerValue
  }

  selectFacilitadorTarea(select:MatSelectChange){
    this.facilitadorTarea = select.source.triggerValue;
  }

  selectAsignadoAtarea(select:MatSelectChange){
    this.asignadoAtarea = select.source.triggerValue    
  }

  selectTecnologiaTarea(select:MatSelectChange){
    this.tecnologiaTarea = select.source.triggerValue
  }

  

  //Filtro de Tareas
  prepararFiltro() {
    const filtroNombreTarea = this.filtroAvanzado(1, this.nombreTarea);
    const filtroPrioridad = this.filtroAvanzado(2, this.prioridadTarea);
    const filtroFacilitador = this.filtroAvanzado(3, this.facilitadorTarea);
    const filtroAsignadoA = this.filtroAvanzado(4, this.asignadoAtarea);
    //const filtroTecnologia = this.filtroAvanzado(5, this.tecnologiaTarea);
    //const filtroFechaInicioDesde = this.filtroAvanzado(6, this.funcion);
    //const filtroFechaInicioHasta = this.filtroAvanzado(7, this.funcion);
    //const filtroPlanificadaDesde = this.filtroAvanzado(8, this.funcion);
    //const filtroPlanificadaHasta = this.filtroAvanzado(9, this.funcion);
    //const filtroFinDesde = this.filtroAvanzado(10, this.funcion);
    //const filtroFinHasta = this.filtroAvanzado(11, this.funcion);
    
    
    this.listaTareasProyectosAux = this.buscarCoincidencias(filtroNombreTarea, filtroPrioridad ,filtroFacilitador,filtroAsignadoA);
    console.log(this.listaTareasProyectosAux)
    this.dialogRef.close(this.listaTareasProyectosAux);
  }

  filtroAvanzado(tipo: number, valor: string) {
    let arrayTemp: any = [];
    let arrayTabla: any;
    switch (tipo) {
      case 1:
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

      case 2:
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, apellido: tarea.prioridad };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        return arrayTemp;

      case 3:
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, facilitador: tarea.facilitador };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        console.log(arrayTemp)
        return arrayTemp;

      case 4:
        this.listaTareasProyectosAux.forEach(tarea => {
          let obj = { id: tarea.id_tarea, facilitador: tarea.usuario_asignado };
          arrayTemp.push(obj);
        });
        arrayTabla = new MatTableDataSource(arrayTemp);
        arrayTabla.filter = valor.trim().toLowerCase();
        arrayTemp = arrayTabla.filteredData;
        console.log(arrayTemp)
        return arrayTemp;

      // case 5:
      //   this.listaTareasProyectosAux.forEach(tarea => {
      //     let obj = { id: tarea.id_tarea, facilitador: tarea.usuario_asignado };
      //     arrayTemp.push(obj);
      //   });
      //   arrayTabla = new MatTableDataSource(arrayTemp);
      //   arrayTabla.filter = valor.trim().toLowerCase();
      //   arrayTemp = arrayTabla.filteredData;
      //   console.log(arrayTemp)
      //   return arrayTemp;
    }
  }

  buscarCoincidencias(arrayNombre: any, arrPrioridad:any, arrayFacilitador: any, arrAsignado:any) {
    let encontrados: any = [];

    this.listaTareasProyectosAux.forEach(tarea => {
      let encontradoNombre = false;
      let encontradoPrioridad = false;
      let encontradoFacilitador = false;
      let encontradoAsignado = false;
      
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
      
      
      if (encontradoNombre && encontradoPrioridad && encontradoFacilitador && encontradoAsignado) {
        encontrados.push(tarea);
      }
    });
    
    return encontrados;
  }
  
  
  getAsignadoAProyecto(programador: any){
    this.asignadoAproyecto = programador;
    this.filtrosProyectoDialog[3].asignadoAproyecto = this.asignadoAproyecto;
  }
  
  getProyecto(proyecto:any):void{
   
    this.proyectoSeleccionado = proyecto.nombre_projecto;
    this.nombreProyecto = this.proyectoSeleccionado
    console.log(this.proyectoSeleccionado)
    this.buscarProyectoInterface.proyectoSeleccionado = this.proyectoSeleccionado;
    this.buscarTareasInterface.idProyectoSeleccionado = proyecto.id_projecto;
    this.dialogRef.close(this.buscarProyectoInterface);
    console.log(this.nombreProyecto);
    
  }


  getFacilitadorTarea(facilitador:any){
    this.facilitadorTarea = facilitador;
    console.log(this.facilitadorTarea);
  }
  fechaInicio!: MatDatepickerInputEvent<any, any>;
  fechaFin!: MatDatepickerInputEvent<any, any>;

  getFechaInicio(event: MatDatepickerInputEvent<any, any>){
    this.fechaInicio= event.value
    
  }

  getFechaFin(event: MatDatepickerInputEvent<any, any>){
    this.fechaFin = event.value
    this.comparaFechas(this.fechaInicio,this.fechaFin );
  }

  comparaFechas(fechaInicio:MatDatepickerInputEvent<any, any>,fechaFin: MatDatepickerInputEvent<any, any>){
    console.log(fechaInicio < fechaFin)
    return fechaInicio < fechaFin;
  }
  
 
  getAsignadoAtarea(programador:any){//Programadores
    //Obtener token
    
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
  

  guardarValoresDeFiltro(){
    if(this.buscarProyecto){
      this.filtrosProyectoDialog = JSON.parse(JSON.stringify(this.buscarProyectoInterface.filtros));
      this.filtrosProyectoDialog[0].numeroProyecto = this.numeroProyecto;
      this.filtrosProyectoDialog[1].nombreProyecto = this.nombreProyecto;
      this.filtrosProyectoDialog[2].clienteProyecto = this.clienteProyecto;
      this.filtrosProyectoDialog[3].asignadoAproyecto = this.asignadoAproyecto;
      this.dialogRef.close(this.filtrosProyectoDialog);
    }
    else{
      //this.filtrosTareasDialog = JSON.parse(JSON.stringify(this.filtrosTarea));
      this.filtrosTareasDialog[0].nombreTarea = this.nombreTarea;
      this.filtrosTareasDialog[1].prioridadTarea = this.prioridadTarea;
      this.filtrosTareasDialog[2].facilitadorTarea = this.facilitadorTarea;
      this.filtrosTareasDialog[3].asignadoAtarea = this.asignadoAtarea;
      this.filtrosTareasDialog[4].tecnologiatarea = this.tecnologiaTarea;
      this.dialogRef.close(this.filtrosTareasDialog);
    }

  }

  limpiarValoresDeFiltros(){
    
    if(this.buscarProyecto){
      //this.filtrosProyectoDialog = JSON.parse(JSON.stringify(this.buscarProyectoInterface.filtros));
      console.log(this.filtrosProyectoDialog)
      this.filtrosProyectoDialog[0].numeroProyecto = '';
      this.filtrosProyectoDialog[1].nombreProyecto = '';
      this.filtrosProyectoDialog[2].clienteProyecto= '';
      this.filtrosProyectoDialog[3].asignadoAproyecto = '';
      this.dialogRef.close(this.filtrosProyectoDialog);
    }
    else{
      console.log(this.filtrosTareasDialog)
      this.filtrosTareasDialog[0].nombreTarea = '';
      this.filtrosTareasDialog[1].prioridadTarea = '';
      this.filtrosTareasDialog[2].facilitadorTarea = '';
      this.filtrosTareasDialog[3].asignadoAtarea = '';
      this.filtrosTareasDialog[4].tecnologiatarea = '';
      this.dialogRef.close(this.filtrosTareasDialog);
    }
  }

  cerrarDialog(){
    if(this.buscarProyecto){
      this.dialogRef.close(this.filtrosProyectoDialog);
    }
    else{
      this.dialogRef.close(this.filtrosTareasDialog);
    }
  }

}
