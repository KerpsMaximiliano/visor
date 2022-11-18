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
import { FiltroService } from 'src/app/services/i2t/filtro.service';



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
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {

  mesesAnios:Array<String> = [];
  mesAnioSeleccionado: String = 'Sprint'
  idUsuario: string = '';
  asignadasAmiDesactivado: boolean = true;
  asignadasAmiActivado: boolean = false;
  tareasdelProyecto:PropiedadesTarea[] = [];
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

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private _tareaService: TareaService, private _filtroService: FiltroService) {
    
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
    
    //Obtengo usuario logueado
    this._filtroService.getUserId(localStorage.getItem('usuario')!).subscribe((response: any) => {
      console.log(response)
      localStorage.setItem('userId', response.dataset[0].id);
      this.idUsuario = response.dataset[0].id;
    })
    


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
        if(this.nombreVistaSeleccionada == 'Analista Técnico'){ //Pregunto si hay una vista seleccionada
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
    //console.log(this.filtrosBusquedaProyecto)
    const dialogRef = this.dialog.open(DialogComponent,{width:'700px', data:{buscaProyectos: true}});
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
        this.filtrosTarea.idProyectoSeleccionado = result.id_projecto;
      }   
    })
  }

  buscarTarea(){
    console.log("filtros: "+this.filtrosTarea.idProyectoSeleccionado)
    const dialogRef = this.dialog.open(DialogComponent,{width:'72%', data:{buscaTareas: true, idProyectoSeleccionado:this.idProyectoSeleccionado}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
        if(this.tareasFiltradas != ''){
          console.log(this.tareasFiltradas)
        }
        if(this.nombreVistaSeleccionada != 'Vista'){ //Pregunto si hay una vista seleccionada
          this.setSubtituloProyecto(this.idVistaSeleccionada);
        }
      })
    )
    .subscribe(result => {
      if(result != undefined){
        this.tareasFiltradas= result;
      }
      else{
        this.tareasFiltradas = '';
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
         console.log("TAQREAS FILTRADAS VACIAS")
          this.listaTareasService.forEach( (tarea:any) => {
            if(tarea.tipo_tarea == "Produccion"){
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else{ //Filtró tareas
          this.tareasFiltradasPorVista= [];
          console.log("caew")
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

    if (this.idProyectoSeleccionado == '') {
      this.openSnackBar();
    }
    else {
      this.asignadasAmiDesactivado = !this.asignadasAmiDesactivado;
      if (!this.asignadasAmiDesactivado) {
        this.asignadasAmiActivado = !this.asignadasAmiActivado;
        this._tareaService.getTareasDeProyecto(this.idProyectoSeleccionado).pipe(
          finalize(() => {
            this.listaTareasService = this.listaTareasService.dataset;
            this.tareasFiltradas = [];
            this.listaTareasService.forEach((tarea: any) => {
              if (tarea.id_usuario == this.idUsuario) {
                this.tareasFiltradas.push(tarea);
              }
            });
            if (this.nombreVistaSeleccionada != 'Vista') { //Pregunto si hay una vista seleccionada
              this.setSubtituloProyecto(this.idVistaSeleccionada);
              console.log("Llamó")
            }
          })
        ).subscribe(result => {
          this.listaTareasService = result;
        })
      }
      else {
        this.tareasFiltradas = [];
        this.setSubtituloProyecto(this.idVistaSeleccionada);
        console.log("Entró")
      }
    }

  }

  mesesYanios(){
    if(this.idProyectoSeleccionado == ''){
      this.openSnackBar();
    }
    else{
      this._tareaService.getTareasDeProyecto(this.idProyectoSeleccionado).subscribe((response: any) => {
        this.tareasdelProyecto = response.dataset;
        let mes;
        let año;
        let mesAño;
        
        this.tareasdelProyecto.forEach( (tarea:any) => {
          if(tarea.fecha_inicio != null){
            mes = tarea.fecha_inicio.split('-')[1];
            año = tarea.fecha_inicio.split('-')[0];
            mesAño = String(mes + " - " + año);
            if(!this.mesesAnios.includes(mesAño)){
              this.mesesAnios.push(mesAño)
            }
          }
        });
      });
    }
  }
  setMesAnio(valor:String){
    this.mesAnioSeleccionado = valor;
  }

  openSnackBar() {
    this._snackBar.open('Para filtrar tareas debe seleccionar un proyecto previamente', 'Cerrar', {
      //horizontalPosition: this.horizontalPosition,
      horizontalPosition: 'center',
      //verticalPosition: this.verticalPosition,
      verticalPosition: 'top'
    });
  }
}
