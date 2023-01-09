import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { TareaService } from 'src/app/services/i2t/tarea.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-alta-tarea-dialog',
  templateUrl: './alta-tarea-dialog.component.html',
  styleUrls: ['./alta-tarea-dialog.component.css']
})
export class AltaTareaDialogComponent implements OnInit {
  listaProyectosService: any
  tablaProyectosService: any




  
  asignadoSeleccionado: string = '';
  facilitadorSeleccionado: string = '';
  
  tareaPrecondicion: any = '';
  documentoRelacionado: any = '';


  estiloListaProyectos: string = 'ocultarTabla'; //nombre clase css
  idProyectoSeleccionado: String = '';

  nombreProyecto: string = '';
  tipoTareaSeleccionada: String = '';
  estadoTareaSeleccionado: String = '';
  prioridadSeleccionada: String = '';
  fromAltaTarea: boolean = false;
  columnas: string[] = ['nombre'];
  tipoTarea: string = '';
  estado: string = '';
  prioridad: string = '';
  asignado: string = '';
  facilitador: string = '';
  fechaPlanificada: string = '';
  horasPlanificadas: number = 0;
  mostrarMensajeError: boolean = false;
  mensajeError: string = '';
  
  camposObligatorios: FormGroup
  hayErrores: boolean = false;
  
  //listaProyectos
  constructor(public dialogRef: MatDialogRef<AltaTareaDialogComponent>, private _tareaService: TareaService, public dialogProyectos: MatDialogRef<DialogComponent>) { 

    this.camposObligatorios = new FormGroup({
      nombreProy: new FormControl('', [Validators.required]),
      tipoTareaForm: new FormControl('', [Validators.required]),
      estadoTareaForm: new FormControl('', [Validators.required]),
      prioridadForm: new FormControl('', [Validators.required]),
      asignadoForm: new FormControl('', [Validators.required]),
      facilitadorForm: new FormControl('', [Validators.required]),
      fechaPlanificadaForm: new FormControl('', [Validators.required]),
      horasPlanificadasForm: new FormControl(0, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  seleccionarProyecto(unProyecto: any) {
    this.idProyectoSeleccionado = unProyecto.id_projecto;
    console.log(this.idProyectoSeleccionado);
    
    this.nombreProyecto = unProyecto.nombre_projecto;
    
    this.estiloListaProyectos = 'ocultarTabla'; //nombre clase css
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
    this.asignado = asignado.value;
    
    
  }
  selectFacilitador(facilitador: MatSelectChange){
    this.facilitador = facilitador.value
    
    
  }

  getFechaPlanificada(event: MatDatepickerInputEvent<any, any>){
    const fecha = new Date(event.value);
    let fechaJson = fecha.toJSON();
    this.fechaPlanificada = fechaJson.split('T')[0];
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

  

  altaTarea(){

    let valoresIncorrectos: boolean;
    valoresIncorrectos = this.validarDatos();

    if(this.camposObligatorios.invalid || valoresIncorrectos){
      //Mostrar error
      this.hayErrores = true
    }
    else{
      //llamar servicio de alta tarea
      console.log("Invoca servicio de alta de tarea");

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
  


