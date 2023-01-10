import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { TareaService } from 'src/app/services/i2t/tarea.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { FiltroService } from 'src/app/services/i2t/filtro.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';



export interface altaModificacionTareas{
  altaTarea: boolean,
  modificacionTarea: boolean
  pepito: string
}


@Component({
  selector: 'app-alta-tarea-dialog',
  templateUrl: './alta-tarea-dialog.component.html',
  styleUrls: ['./alta-tarea-dialog.component.css']
})
export class AltaTareaDialogComponent implements OnInit {
  idUsuarioLogueado: string = '';
  listaProyectosService: any
  tablaProyectosService: any

  nombreUsuarios: any = [];

  altaTarea: boolean = false;
  modificarTarea: boolean = false;


  
  asignadoSeleccionado: string = '';
  facilitadorSeleccionado: string = '';
  
  tareaPrecondicion: any = '';
  documentoRelacionado: any = '';


  estiloListaProyectos: string = 'ocultarTabla'; //nombre clase css
  idProyectoSeleccionado: string = '';
  numeroProyecto: number = 0;

  nombreProyecto: string = '';
  tipoTareaSeleccionada: string = '';
  estadoTareaSeleccionado: string = '';
  prioridadSeleccionada: string = '';
  fromAltaTarea: boolean = false;
  columnas: string[] = ['nombre'];
  tipoTarea: string = '';
  estado: string = '';
  prioridad: string = '';
  asignado: string = '';
  idUsuarioAsignado: string = '';
  facilitador: string = '';
  idFacilitador: string = '';
  fechaPlanificada: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  horasPlanificadas: number = 0;
  descripcionTarea: string = '';
  mostrarMensajeError: boolean = false;
  mensajeError: string = '';
  
  camposObligatorios: FormGroup
  hayErrores: boolean = false;
  
  //listaProyectos
  constructor(public dialogRef: MatDialogRef<AltaTareaDialogComponent>, @Inject(MAT_DIALOG_DATA) desdeAltaTarea: altaModificacionTareas, private _tareaService: TareaService, private _filtrosService: FiltroService, public dialogProyectos: MatDialogRef<DialogComponent>) { 
    this.altaTarea = desdeAltaTarea.altaTarea;
    this.modificarTarea = desdeAltaTarea.modificacionTarea;

    this.camposObligatorios = new FormGroup({
      nombreProy: new FormControl('', [Validators.required]),
      tipoTareaForm: new FormControl('', [Validators.required]),
      estadoTareaForm: new FormControl('', [Validators.required]),
      prioridadForm: new FormControl('', [Validators.required]),
      asignadoForm: new FormControl('', [Validators.required]),
      facilitadorForm: new FormControl('', [Validators.required]),
      fechaPlanificadaForm: new FormControl('', [Validators.required]),
      horasPlanificadasForm: new FormControl(0, [Validators.required]),
      notaForm: new FormControl('', [Validators.required]),

    });

    this._tareaService.obtenerUsuarios().subscribe((result) =>{
      
      this.nombreUsuarios = result
      console.log(this.nombreUsuarios.dataset)
    })
    
    this._filtrosService.getUserId(localStorage.getItem('usuario')!).subscribe(
      result => {
        this.idUsuarioLogueado = result.dataset[0].id;
    })
  }

  ngOnInit(): void {
  }

  seleccionarProyecto(unProyecto: any) {
    this.idProyectoSeleccionado = unProyecto.id_projecto;
    this.numeroProyecto = unProyecto.numero_proyecto;
    console.log(this.idProyectoSeleccionado);
    
    this.nombreProyecto = unProyecto.nombre_projecto;
    
    this.estiloListaProyectos = 'ocultarTabla'; //nombre clase css

    this._tareaService.getIdUsuario("fgauchat").subscribe( (result) =>{
      console.log(result)
    })
  }

  selectTipoTarea(tipoTarea: MatSelectChange){
    
    this.tipoTareaSeleccionada = tipoTarea.value
    console.log(this.tipoTareaSeleccionada)
    
  }
  selectEstadoTarea(estado: MatSelectChange){
    this.estadoTareaSeleccionado = estado.value;
    
    
  }
  selectPrioridad(prioridad: MatSelectChange){
    this.prioridadSeleccionada = prioridad.value;
    console.log(this.prioridadSeleccionada)
    
    
  }
  selectAsignado(asignado: MatSelectChange){

    this.asignado = asignado.value.nombre;
    this.idUsuarioAsignado = asignado.value.id_usuario; 
    
    
    
  }
  selectFacilitador(facilitador: MatSelectChange){
    this.facilitador = facilitador.value.nombre
    this.idFacilitador = facilitador.value.id_usuario;
    
    
  }

  getFechaPlanificada(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaPlanificada = fechaJson.split('T')[0];
    console.log(this.fechaPlanificada)
  }

  getHorasPlanificadas():number{
    this.horasPlanificadas = this.camposObligatorios.value['horasPlanificadasForm'];
    return this.horasPlanificadas;
  }

  selectTareaPrecondicion(tarea: MatSelectChange){
    this.tareaPrecondicion = tarea;
  }

  selectDocumentoRelacionado(documento: MatSelectChange){
    this.documentoRelacionado = documento;
  }


  buscarProyectos(event: Event) {
    this.nombreProyecto = (event.target as HTMLInputElement).value;
    //Busca proyecto según lo ingresado en el input
    this._tareaService.getABMproyectoService(this.nombreProyecto).subscribe((response: any) =>{ //Obtengo los proyectos
      this.listaProyectosService = response.dataset;
      this.tablaProyectosService = new MatTableDataSource(this.listaProyectosService);
    
      console.log(this.tablaProyectosService)

    });

    if (this.nombreProyecto == '') {
      this.estiloListaProyectos = 'ocultarTabla';
    }
    else {
      this.estiloListaProyectos = 'mostrarTabla';
    }

  }

  cerrarTablaProyectos(){
    
    if(this.nombreProyecto.length == 0){
      this.estiloListaProyectos = 'ocultarTabla';
    }
  }

  abrirDialogProyecto(event: Event){
    event.preventDefault();
    // const dialogRef = this.dialogProyectos.open(DialogComponent,{width:'700px', data:{buscaProyectos: true}});
    // dialogRef.afterClosed().pipe(
    //   finalize(() => {
        
    //   })
    // )
    // .subscribe(result => {
    //   if(result != undefined){
    //   }   
    // })
  }

  

  crearTarea(){

    let valoresIncorrectos: boolean;
    valoresIncorrectos = this.validarDatos();

    if(this.camposObligatorios.invalid || valoresIncorrectos){
    // if( valoresIncorrectos){
      //Mostrar error
      this.hayErrores = true
    }
    else{
      //llamar servicio de alta tarea
      console.log("Invoca servicio de alta de tarea");
        
      console.log(this.camposObligatorios.value['notaForm'])
      this.descripcionTarea = this.camposObligatorios.value['notaForm'];
      let horasPlanificadas = this.getHorasPlanificadas();
      

      if(this.altaTarea){
        
        this._tareaService.altaTarea("I",this.idProyectoSeleccionado,"nombre de la tarea",this.numeroProyecto,
        this.prioridadSeleccionada,this.idUsuarioAsignado,this.idUsuarioLogueado,this.idFacilitador,this.estadoTareaSeleccionado,
        this.descripcionTarea,"fecha inicio",this.tipoTareaSeleccionada,this.fechaPlanificada,horasPlanificadas,"fecha cierre");
      }


    }
    
  }
  validarDatos():boolean{

    let estadoTarea = this.camposObligatorios.value['estadoTareaForm'];
    let horasPlanificadas = this.camposObligatorios.value['horasPlanificadasForm'];

    if(estadoTarea == 'Completada'){
      this.mensajeError = ' El estado de la tarea no puede ser "Completada" ';
      return true;
    }else if(horasPlanificadas == 0){
      this.mensajeError = ' La cantidad de horas planificadas debe ser mayor a 0 ';
      return true;
    }
    else{
      return false;
    }
  }


  cerrarDialog(){
    this.dialogRef.close();
  }

  
}
  


