import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { Subject } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividades';
import { ModalActividadComponent } from 'src/app/componentes/control-actividad/modal-actividad/modal-actividad.component';
import { HttpClient } from '@angular/common/http';
import { ActividadSuite } from 'src/app/interfaces/actividadesSuite';
import { RestService } from 'src/app/services/i2t/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

act!: Actividad;

  listActividades: Actividad[] = [
    {position: 0,fecha: new Date('01/10/21'), horas: 5, children:['Descripcion para la Actividad 1'], asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 1,fecha: new Date('01/10/21'), horas: 4, children:['Descripcion para la Actividad 1' ],asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 2,fecha: new Date('02/10/21'), horas: 3, children:['Descripcion para la Actividad 1'] ,asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 3,fecha: new Date('03/10/21'), horas: 6, children:['Descripcion para la Actividad 1'] ,asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 4,fecha: new Date('04/10/21'), horas: 34, children:['Descripcion para la Actividad 1'] ,asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 5,fecha: new Date('05/10/21'), horas: 6, children:['Descripcion para la Actividad 1'] ,asunto:'XXX1', tareas:'tarea1',toggle:0},
    {position: 6,fecha: new Date('06/10/21'), horas: 2, children:['Descripcion para la Actividad 1'] ,asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 7,fecha: new Date('07/10/21'), horas: 4, children:['Descripcion para la Actividad 1'] ,asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 8,fecha: new Date('08/10/21'), horas: 5, children:['Descripcion para la Actividad 1'] ,asunto:'XXXX', tareas:'tarea1',toggle:0},
    {position: 9,fecha: new Date('09/10/21'), horas: 6, children:['Descripcion para la Actividad 1'] ,asunto:'XXXX', tareas:'tarea1',toggle:0}
  ]

  
  
index!: number | undefined;
 /*form: FormGroup = new FormGroup({
    fecha: new FormControl(null),
    horas: new FormControl('55555', Validators.required),
    descripcion: new FormControl('55555', Validators.required),
    asunto: new FormControl('55555', Validators.required),
    tareas: new FormControl('5555')
  });*/
  form! : FormGroup;
  private enviarIndexSubject = new Subject<number>();
  enviarIndexObservable = this.enviarIndexSubject.asObservable();

  /*initializeFormGroup() {
    this.form.setValue({
      fecha: null,
      horas: '9',
      descripcion: 'prueba',
      asunto: 'prueba',
      tareas: 'prueba'
    });
  }*/


  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<ModalActividadComponent>,
              private http: HttpClient,
              private rest: RestService,
              @Inject(MAT_DIALOG_DATA) public data: Actividad,) {
    this.form = this.fb.group({
      fecha: ['',Validators.required],
      horasEjecutadas: ['',Validators.required],
      children: ['Esta actividad no tiene descripción'],
      asunto: ['',Validators.required],
      
      tareaAsociada: ['',Validators.required],
    })
   }

   enviarIndex(index: number){
    this.index = index;
    this.enviarIndexSubject.next(index);
   }

  getActividad(){
    console.log('slice',this.listActividades.slice());
    return this.listActividades.slice();
  }
  
  eliminarActividad(index: number){
    this.listActividades.splice(index, 1);
    console.log('eliminado',this.listActividades);
  }

  editarActividad(index: number, actividad: Actividad){
    this.listActividades.splice(index,1,actividad);
    console.log('editado',this.listActividades);
    return index;
  }

  openModalActividad(valor: number){
    this.dialog.open(ModalActividadComponent,{
      width:'800px',
      panelClass: 'confirm-dialog-container',
      disableClose: true
    })
  }

  agregarActividad2(actividad: Actividad){
    this.listActividades.push(actividad);
    console.log('arreglo final',this.listActividades);
  }

  public get(url: string){
    return this.http.get(url);
  }


  public getAllActividadesSuite(){
    const path = 'http://tstvar.i2tsa.com.ar:3001/api/proc/AbmActividades';
    return this.http.get<ActividadSuite[]>(path);
  }
 
  iniciar(){
    let jsbody: string = JSON.stringify({
      par_modo : "",
    titulo: "",
    id_actividad: "",
    estado: "",
    horas_ejecutadas: 0,
    tipo_actividad : "",
    asignado_a : "",
    id_tarea: "a0287b5d-14c5-11ed-965a-00505601020a"
    });
    return this.rest.callProcedimientoVisor(jsbody,"AbmActividades");
  }


  
}
