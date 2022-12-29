import { Component, OnInit,Input, Output, EventEmitter, HostListener } from '@angular/core';
import { TareaService } from 'src/app/services/i2t/tarea.service';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


export interface FiltrosTarea{
  nombreTarea: string,
  prioridadTarea: string,
  facilitadorTarea: string ,
  asignadoAtarea: string ,
  tecnologiaTarea: string ,
  idProyectoSeleccionado: String 
}


@Component({
  selector: 'app-filtro-proyecto-input',
  templateUrl: './filtro-proyecto-input.component.html',
  styleUrls: ['./filtro-proyecto-input.component.css']
})




export class FiltroProyectoInputComponent implements OnInit {
  

  columnas: string[] = ['nombre'];
  filtrosTarea: FiltrosTarea = {
    nombreTarea: '',
    prioridadTarea: '',
    facilitadorTarea: '',
    asignadoAtarea: '',
    tecnologiaTarea: '',
    idProyectoSeleccionado: '' 
  }

  listaProyectosService: any;
  valorInputProyecto: string = '';
  estiloListaProyectos: String = 'ocultarTabla';
  seleccionoProyecto: String = '';
  nombreProyecto: String = '';
  idProyectoSeleccionado: string = '';
  listaTareasService: any; //Corregir tipo de dato
  nombreVistaSeleccionada: string = "Vista";
  idVistaSeleccionada: string = "Vista";
  tareasFiltradasPorVista: any = []; //Corregir tipo de dato
  subtituloProyecto: string = '';
  tareasFiltradas: any = [];
  proyectoSeleccionado: any; //Corregir tipo de dato
  

  @Input() desdeABMtareas: boolean = false;

  @Output()
  enviar: EventEmitter<boolean> = new EventEmitter<boolean>();
  contexto:boolean = false;


  constructor(private _tareaService: TareaService, public dialog: MatDialog) {
    
  }

  @HostListener('document:click', ['$event'])
  manejoClickFueraComponente() {
    if (this.estiloListaProyectos == 'mostrarTabla'){
      this.estiloListaProyectos="ocultarTabla"
    }     
  }
  inside: boolean = false;

  ngOnInit(): void {
    console.log("Ejecuta")
  }

  cerrarTablaProyectos(event: Event){
    
    if(this.valorInputProyecto.length == 0){
      this.estiloListaProyectos = 'ocultarTabla';
    }
  }

  buscarProyectos(event: Event) {   
    this._tareaService.getABMproyectoService().subscribe((response: any) =>{ //Obtengo los proyectos
      this.listaProyectosService = response.dataset;
      this.listaProyectosService = new MatTableDataSource(this.listaProyectosService);
    
      console.log(this.listaProyectosService)

      const filterValue = (event.target as HTMLInputElement).value;
      this.valorInputProyecto = (event.target as HTMLInputElement).value;
      console.log(this.valorInputProyecto)

      if (this.valorInputProyecto == '') {
        console.log("Entra al if")
        this.estiloListaProyectos = 'ocultarTabla';
      }
      else {
        this.estiloListaProyectos = 'mostrarTabla';
        this.listaProyectosService.filter = filterValue.trim().toLowerCase();
      }
    });                     
    

  }

  seleccionarProyecto(unProyecto: any){
    this.nombreProyecto = unProyecto.nombre_projecto;
    this.idProyectoSeleccionado = unProyecto.id_projecto;
    this.filtrosTarea.idProyectoSeleccionado = this.idProyectoSeleccionado; //Para que no aparezca mensaje al abrir modal de filtro de tareas
    this.estiloListaProyectos = 'ocultarTabla'; //nombre clase css
    this.valorInputProyecto = unProyecto.nombre_projecto;
    console.log("Entra")
    console.log(this)
    this.enviar.emit(true);
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
    
  setSubtituloProyecto(idVistaSeleccionada: string) {

    const vistaSeleccionada = idVistaSeleccionada;

    this.tareasFiltradasPorVista = [];
    switch (vistaSeleccionada) {
      case 'Vista':
        this.subtituloProyecto = '';
        this.tareasFiltradasPorVista = [];
        break;

      case 'Analista Funcional':
        this.subtituloProyecto = ' Avance de Diseño funcional';
        this.tareasFiltradasPorVista = [];
        if (this.idProyectoSeleccionado == '') { //Selecciona vista sin elegir proyecto. Muestra solo columnas
          this.tareasFiltradasPorVista = [];
        }
        else if (this.idProyectoSeleccionado != '' && this.tareasFiltradas == '') { //Selecciona proyecto y vista. Muestra tareas de ese tipo de vista
          this.listaTareasService.forEach((tarea: any) => {
            if (tarea.tipo_tarea == "Design") {
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else { //Filtró tareas
          this.tareasFiltradas.forEach((tarea: any) => {
            if (tarea.tipo_tarea == "Design") {
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }

        break;
      case 'Analista Tecnico':
        this.subtituloProyecto = ' Avance de Diseño técnico';
        if (this.idProyectoSeleccionado == '') { //Si no hay un proyecto seleccionado muestra col 
          this.tareasFiltradasPorVista = [];
        }
        else if (this.idProyectoSeleccionado != '' && this.tareasFiltradas == '') { //Selecciona proyecto y vista. Muestra tareas de ese tipo de vista
          this.listaTareasService.forEach((tarea: any) => {
            if (tarea.tipo_tarea == "RelevamientoReq") {
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else { //Filtró tareas
          this.tareasFiltradas.forEach((tarea: any) => {
            if (tarea.tipo_tarea == "RelevamientoReq") {
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        break;
      case 'Desarrollador':
        this.subtituloProyecto = ' Avance de Desarrollo';
        if (this.idProyectoSeleccionado == '') { //Si no hay un proyecto seleccionado muestra col 
          this.tareasFiltradasPorVista = [];
        }
        else if (this.idProyectoSeleccionado != '' && this.tareasFiltradas == '') { //Selecciona proyecto y vista. Muestra tareas de ese tipo de vista   
          this.listaTareasService.forEach((tarea: any) => {
            if (tarea.tipo_tarea == "Produccion") {
              this.tareasFiltradasPorVista.push(tarea);
            }
          });
        }
        else { //Filtró tareas
          this.tareasFiltradasPorVista = [];
          this.tareasFiltradas.forEach((tarea: any) => {
            if (tarea.tipo_tarea == "Produccion") {
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
  }
}
