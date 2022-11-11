import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TareaService } from 'src/app/services/i2t/tarea.service';


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
export interface FiltrosTarea{
  nombreTarea: string,
  prioridadTarea: string,
  facilitadorTarea: string ,
  asignadoAtarea: string ,
  tecnologiaTarea: string ,
  idProyectoSeleccionado: string 
}
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {
  proyectoSeleccionado: any;
  nombreVistaSeleccionada: string = "Vista"
  idVistaSeleccionada: string = "Vista"
  listaProyectosService: ResponseService[] = [] ;
  listaProyectos: PropiedadesProyecto[] = [];
  dataSource: MatTableDataSource<PropiedadesProyecto>;
  dataSourceService: any
  nombreProyecto:string = '';
  idProyectoSeleccionado: string = ''
  estiloListaProyectos: string = 'ocultarTabla';
  seleccionoProyecto = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  subtituloProyecto: string ='';
  proyectoS: any;
  
  filtrosBusquedaTareas: Object[] = [
    {nombreTarea: ''},
    {prioridadTarea: ''},
    {facilitadorTarea: ''},
    {asignadoAtarea: ''},
    {tecnologiatarea: ''},
    {idProyectoSeleccionado: ''}
  ]

  filtrosTarea: FiltrosTarea = {
  nombreTarea: '',
  prioridadTarea: '',
  facilitadorTarea: '',
  asignadoAtarea: '',
  tecnologiaTarea: '',
  idProyectoSeleccionado: '' 
  }
  

  listaTareasService:any;
  tareasFiltradas: any = [];
  tareasFiltradasPorVista: any= []; 
  columnas: string[] = ['nombre'];

  valorInputProyecto:string = ''

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private _tareaService: TareaService) {
    
    //this.filtrosBusquedaTareas = JSON.parse(JSON.stringify(this.filtrosBusquedaTareas));

    const proyectos: PropiedadesProyecto[] = [
      { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
      { id: 125029, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 124192, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
      { id: 888888, nombre: 'Visorrr - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 144, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
      { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' }
    ]
    this.listaProyectos = proyectos;
    
    this.dataSource = new MatTableDataSource(this.listaProyectos);

    this._tareaService.getABMproyectoService().subscribe((response: any) =>{ //Obtengo los proyectos
      this.listaProyectosService = response.dataset;
      this.dataSourceService = new MatTableDataSource(this.listaProyectosService);
    
      console.log(this.dataSourceService)
    });

  }

  ngOnInit(): void {
   }

  buscarProyectos(event: Event) {                                        
    const filterValue = (event.target as HTMLInputElement).value;
    this.valorInputProyecto = (event.target as HTMLInputElement).value;
    
    if(this.valorInputProyecto == ''){
      this.estiloListaProyectos = 'ocultarTabla';
    }
    else{
      this.estiloListaProyectos = 'mostrarTabla';
      this.dataSourceService.filter = filterValue.trim().toLowerCase();
    }

  }
  
  seleccionarProyecto(unProyecto: any){
    this.nombreProyecto = unProyecto.nombre_projecto;
    this.idProyectoSeleccionado = unProyecto.id_projecto
    this.filtrosTarea.idProyectoSeleccionado = this.idProyectoSeleccionado; //Para que no aparezca mensaje al abrir modal de filtro de tareas
    this.estiloListaProyectos = 'ocultarTabla'; //nombre clase css
    this.valorInputProyecto = '';
    this._tareaService.getTareasDeProyecto(this.idProyectoSeleccionado).pipe(
      finalize(() => {
        this.listaTareasService = this.listaTareasService.dataset;
        if(this.nombreVistaSeleccionada != 'Vista'){ //Pregunto si hay una vista seleccionada
          this.setSubtituloProyecto(this.idVistaSeleccionada);
        }
      })
    )
    .subscribe(result => {
      this.listaTareasService = result;
    })

    this._tareaService.enviarProyectoActual(unProyecto);
  }

  recibirCambio(){
    this._tareaService.getTareasDeProyecto(this.idProyectoSeleccionado).pipe(
      finalize(() => {
        this.listaTareasService = this.listaTareasService.dataset;
        if(this.nombreVistaSeleccionada == 'Analsita Técnico'){ //Pregunto si hay una vista seleccionada
          this.tareasFiltradasPorVista=[];
          //this.setSubtituloProyecto("X",this.idVistaSeleccionada);
          this.listaTareasService.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "RelevamientoReq"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else if(this.nombreVistaSeleccionada == 'Analista funcional'){
          this.tareasFiltradasPorVista=[];
          //this.setSubtituloProyecto("X",this.idVistaSeleccionada);
          this.listaTareasService.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "Design"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else if(this.nombreVistaSeleccionada == 'Desarrollador'){
          this.tareasFiltradasPorVista=[];
          //this.setSubtituloProyecto("X",this.idVistaSeleccionada);
          this.listaTareasService.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "Produccion"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
      })
    )
    .subscribe(result => {
      this.listaTareasService = result;
    })   
  }
 

  abrirDialogProyecto(event: Event){
    event.preventDefault();
    const dialogRef = this.dialog.open(DialogComponent,{width:'600px', data:{buscaProyectos: true}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
        if(this.proyectoSeleccionado != undefined){
          this.seleccionarProyecto(this.proyectoSeleccionado);
        }
      })
    )
    .subscribe(result => {
      if(result != undefined){
        this.proyectoSeleccionado = result;
        //this.idProyectoSeleccionado = this.proyectoSeleccionado.id_projecto
        this.filtrosTarea.idProyectoSeleccionado = result.id_projecto
      }   
    })
  }

  buscarTarea(){
    console.log("filtros: "+this.filtrosTarea.idProyectoSeleccionado)
    const dialogRef = this.dialog.open(DialogComponent,{width:'72%', data:{buscaTareas: true, filtros:this.filtrosTarea}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
        this.tareasFiltradas= this.tareasFiltradas.dataset;
        if(this.nombreVistaSeleccionada != 'Vista'){ //Pregunto si hay una vista seleccionada
          this.setSubtituloProyecto(this.idVistaSeleccionada);
        }
      })
    )
    .subscribe(result => {
      if(result != undefined){
        this.tareasFiltradas= result;
      }
      
         
    })
  }

  verTareasDeVista(event: Event){
    console.log("i vista seleccionada",this.idVistaSeleccionada)
    this.idVistaSeleccionada = (event.target as HTMLInputElement).id;
    this.nombreVistaSeleccionada = (event.target as HTMLInputElement).innerText;
    this.setSubtituloProyecto(this.idVistaSeleccionada);
  }
  

  setSubtituloProyecto(idVistaSeleccionada: string){
    const vistaSeleccionada = idVistaSeleccionada; 
    this.tareasFiltradasPorVista = [];
    switch(vistaSeleccionada){
      case 'Vista':
        this.subtituloProyecto = '';
        this.tareasFiltradasPorVista= [];
      break;
      
      case 'Analista Funcional':
        this.subtituloProyecto = ' Avance de Diseño funcional';
        this.tareasFiltradasPorVista= [];
        if(this.idProyectoSeleccionado == ''){ //Selecciona vista sin elegir proyecto. Muestra solo columnas
          this.tareasFiltradasPorVista= [];
        }
        else if(this.idProyectoSeleccionado != '' && this.tareasFiltradas == ''){ //Selecciona proyecto y vista. Muestra tareas de ese tipo de vista
          this.listaTareasService.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "Design"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
          console.log(this.tareasFiltradasPorVista)
        }
        else{ //Filtró tareas
          this.tareasFiltradas.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "Design"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        
      break;
      case 'Analista Tecnico':
        this.subtituloProyecto = ' Avance de Diseño técnico';
        if(this.idProyectoSeleccionado == ''){ //Si no hay un proyecto seleccionado muestra col 
          this.tareasFiltradasPorVista= [];
        }
        else if(this.idProyectoSeleccionado != '' && this.tareasFiltradas == ''){ //Selecciona proyecto y vista. Muestra tareas de ese tipo de vista
          this.listaTareasService.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "RelevamientoReq"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else{ //Filtró tareas
          this.tareasFiltradas.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "RelevamientoReq"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
      break;
      case 'Desarrollador':
        this.subtituloProyecto = ' Avance de Desarrollo';
        if(this.idProyectoSeleccionado == ''){ //Si no hay un proyecto seleccionado muestra col 
          this.tareasFiltradasPorVista= [];
        }
        else if(this.idProyectoSeleccionado != '' && this.tareasFiltradas == ''){ //Selecciona proyecto y vista. Muestra tareas de ese tipo de vista
          this.listaTareasService.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "Produccion"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else{ //Filtró tareas
          this.tareasFiltradas.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "Produccion"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
      break;
      case 'Tester':
        this.subtituloProyecto = ' Avance de Testing';
      break;
      case 'Project manager':
        this.subtituloProyecto = ' Avance del Proyecto';
      break;

      default:
        this.subtituloProyecto = '';
      break;
    }
    this.recibirCambio();
  }

  getUsuarioTareasAsignadas(){
    console.log("ejecuta")
    this._tareaService.asignadasAmi = 'pepito' 
  }

  openSnackBar() {
    this._snackBar.open('Seleccione un proyecto y una vista', 'Cerrar', {
      //horizontalPosition: this.horizontalPosition,
      horizontalPosition: 'center',
      //verticalPosition: this.verticalPosition,
      verticalPosition: 'top'
    });
  }
}
