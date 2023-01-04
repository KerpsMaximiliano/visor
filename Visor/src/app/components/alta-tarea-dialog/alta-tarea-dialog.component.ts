import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { TareaService } from 'src/app/services/i2t/tarea.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-alta-tarea-dialog',
  templateUrl: './alta-tarea-dialog.component.html',
  styleUrls: ['./alta-tarea-dialog.component.css']
})
export class AltaTareaDialogComponent implements OnInit {
  listaProyectosService: any
  tablaProyectosService: any




  fechaPlanificada: string = '';
  asignadoSeleccionado: string = '';
  facilitadorSeleccionado: string = '';
  horasPlanificadas: number = 0;
  tareaPrecondicion: any = '';
  documentoRelacionado: any = '';


  valorInputProyecto: string = '';
  idProyectoSeleccionado: String = '';
  nombreProyecto: string = '';
  tipoTareaSeleccionada: String = '';
  estadoTareaSeleccionado: String = '';
  prioridadSeleccionada: String = '';
  fromAltaTarea: boolean = false;
  estiloListaProyectos: string = 'ocultarTabla'; //nombre clase css
  columnas: string[] = ['nombre'];
  tipoTarea: string = '';
  estado: string = '';
  prioridad: string = '';
  asignado: string = '';
  facilitador: string = '';

  datosObligatorios: FormGroup;
  //listaProyectos
  constructor(public dialogRef: MatDialogRef<AltaTareaDialogComponent>, private _tareaService: TareaService, public dialogProyectos: MatDialogRef<DialogComponent>, public fb: FormBuilder) { 
    this.datosObligatorios = this.fb.group({
      nombreProyecto: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
      url: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  seleccionarProyecto(unProyecto: any) {
    this.nombreProyecto = unProyecto.nombre_projecto;
    this.idProyectoSeleccionado = unProyecto.id_projecto;
    
    this.estiloListaProyectos = 'ocultarTabla'; //nombre clase css
    this.valorInputProyecto = this.nombreProyecto;
  }

  selectTipoTarea(tipoTarea: MatSelectChange){
    this.tipoTarea = tipoTarea.value;
    console.log(tipoTarea)
  }
  selectEstadoTarea(estado: MatSelectChange){
    this.estado = estado.value;
    console.log(estado)
  }
  selectPrioridad(prioridad: MatSelectChange){
    this.prioridad = prioridad.value;
    console.log(prioridad)
  }
  selectAsignado(asignado: MatSelectChange){
    this.asignado = asignado.value;
    console.log(asignado)
  }
  selectFacilitador(facilitador: MatSelectChange){
    this.facilitador = facilitador.value;
    console.log(facilitador)
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
    this.valorInputProyecto = (event.target as HTMLInputElement).value;
    //Busca proyecto según lo ingresado en el input
    this._tareaService.getABMproyectoService(this.valorInputProyecto).subscribe((response: any) =>{ //Obtengo los proyectos
      this.listaProyectosService = response.dataset;
      this.tablaProyectosService = new MatTableDataSource(this.listaProyectosService);
    
      console.log(this.tablaProyectosService)

    });

    if (this.valorInputProyecto == '') {
      this.estiloListaProyectos = 'ocultarTabla';
    }
    else {
      this.estiloListaProyectos = 'mostrarTabla';
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

  cerrarTablaProyectos(){
    
    if(this.valorInputProyecto.length == 0){
      this.estiloListaProyectos = 'ocultarTabla';
    }
  }

  altaTarea(){
    console.log(this.datosObligatorios.value);
    console.log(this.nombreProyecto)
    console.log(this.tipoTarea);
    console.log(this.estado);
    console.log(this.prioridad);
    console.log(this.asignado);
    console.log(this.facilitador);
    console.log(this.fechaPlanificada)
    console.log(this.horasPlanificadas)
  }
  cerrarDialog(){
    this.dialogRef.close();
  }

  
}
  


