import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { Subject } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividades';
import { ModalActividadComponent } from './modal-actividad/modal-actividad.component';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {


  listActividades: Actividad[] = [
    {fecha: new Date('01/10/21'), horas: 5, descripcion:'Descri´cion para la Actividad 1' , asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('01/10/21'), horas: 4, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('02/10/21'), horas: 3, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('03/10/21'), horas: 6, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('04/10/21'), horas: 34, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('05/10/21'), horas: 6, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('06/10/21'), horas: 2, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('07/10/21'), horas: 4, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('08/10/21'), horas: 5, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
    {fecha: new Date('09/10/21'), horas: 6, descripcion:'' ,asunto:'XXXX', tareas:'tarea1'},
  ];

  form: FormGroup = new FormGroup({
    fecha: new FormControl(null),
    horas: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.email),
    asunto: new FormControl('', Validators.required),
    tareas: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      fecha: null,
      horas: '9',
      descripcion: '',
      asunto: '',
      tareas: ''
    });
  }

  private activarModalActividadSubject = new Subject<FormGroup>();
  enviarModalActividadObservable = this.activarModalActividadSubject.asObservable();


  constructor(private dialog: MatDialog) { }

  getActividad(){
    return this.listActividades.slice();
  }

  eliminarActividad(index: number){
    this.listActividades.splice(index, 1);
  }

  /*openModalActividad(form: FormGroup){
    return this.dialog.open(ModalActividadComponent,{
      width:'500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data :{
        formulario: form
      }
    })
  }*/
  openModalActividad(){
    this.dialog.open(ModalActividadComponent,{
      width:'500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true
    })
  }

  agregarActividad2(actividad: Actividad){
    this.listActividades.unshift(actividad);
  }
  
}
