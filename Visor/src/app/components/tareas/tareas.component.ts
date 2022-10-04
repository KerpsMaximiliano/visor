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
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {
  listaProyectosService: ResponseService[] = [] ;
  listaProyectos: PropiedadesProyecto[] = [];
  dataSource: MatTableDataSource<PropiedadesProyecto>;
  dataSourceService: any
  nombreProyecto='';
  estiloListaProyectos: string = 'ocultarTabla';
  seleccionoProyecto = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  subtituloProyecto: string ='';
  filtrosBusquedaProyecto: Object[] = [
    {numeroProyecto: ''},
    {nombreProyecto: ''},
    {clienteProyecto: ''},
    {asignadoAproyecto: ''}
  ]
  filtrosBusquedaTareas: Object[] = [
    {nombreTarea: ''},
    {prioridadTarea: ''},
    {facilitadorTarea: ''},
    {asignadoAtarea: ''},
    {tecnologiatarea: ''}
  ]

  columnas: string[] = ['nombre'];


  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private _tareaService: TareaService) {
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

    this._tareaService.getABMproyectoService().subscribe((response: any) =>{
    this.listaProyectosService = response.dataset;
    this.dataSourceService = new MatTableDataSource(this.listaProyectosService);
    
    console.log(this.dataSourceService.filteredData[0])
    
  });
  }

  ngOnInit(): void {
  }

  buscarProyectos(event: Event) {    
                                             
    const filterValue = (event.target as HTMLInputElement).value;
    
    if(this.nombreProyecto == ''){
      this.estiloListaProyectos = 'ocultarTabla';
      console.log("vacio")
    }
    else{
      this.estiloListaProyectos = 'mostrarTabla'
      this.dataSourceService.filter = filterValue.trim().toLowerCase();
      console.log("No vacio")

    }
  }
  seleccionarProyecto(unProyecto: any){
    this.nombreProyecto = unProyecto.nombre_projecto;
    this.estiloListaProyectos = 'ocultarTabla'; //nombre clase css
    console.log(this.nombreProyecto)
  }

  abrirDialogProyecto(event: Event){
    event.preventDefault();
    console.log(this.filtrosBusquedaProyecto)
    const dialogRef = this.dialog.open(DialogComponent,{width:'600px', data:{buscaProyectos: true, filtros: this.filtrosBusquedaProyecto}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
        //this.proyectoSeleccionado();
      })
    )
    .subscribe(result => {
      console.log(result)

      if (result.proyectoSeleccionado !== undefined) {

        this.nombreProyecto = result.proyectoSeleccionado
        //No utilizó filtros para encontrar el proyecto
        console.log(this.nombreProyecto)
      }

        
      
    })
  }

  buscarTarea(){
    console.log(this.filtrosBusquedaTareas)
    const dialogRef = this.dialog.open(DialogComponent,{width:'72%', data:{buscaTareas: true, filtros:this.filtrosBusquedaTareas}});
    dialogRef.afterClosed().pipe(
      finalize(() => {
          console.log("Actualiza autoridades")
      })
    )
    .subscribe(result => {
      this.filtrosBusquedaTareas = result;
      console.log(result)
         
    })
  }

  proyectoSeleccionado(event: Event){
    console.log(this.nombreProyecto)
    if(this.nombreProyecto == ''){
      console.log(this.nombreProyecto)
      this.openSnackBar();
     
    }
    else{
      this.setSubtituloProyecto(event);
      if(this.nombreProyecto == 'cancelar'){
        this.nombreProyecto = '';
      }
      else{
      }
      
    } 
  }

  setSubtituloProyecto(event: Event){
    const vistaSeleccionada = (event.target as HTMLInputElement).id
    switch(vistaSeleccionada){
      case 'Analista Funcional':
        this.subtituloProyecto = ' Avance de Diseño funcional';
      break;
      case 'Analista Tecnico':
        this.subtituloProyecto = ' Avance de Diseño técnico';
      break;
      case 'Desarrollador':
        this.subtituloProyecto = ' Avance de Diseño funcional';
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