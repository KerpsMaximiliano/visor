import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { Actividad } from 'src/app/interfaces/actividades';
import { DialogService } from 'src/app/services/i2t/dialog.service';
import { ActividadService } from 'src/app/services/i2t/actividad.service';
import { ActividadSuite } from 'src/app/interfaces/actividadesSuite';
import { finalize } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styleUrls: ['./modal-actividad.component.css']
})
export class ModalActividadComponent implements OnInit {
 
  startDate = new Date(1990, 0, 1);
  form: FormGroup;
  type!: String;
  actividad!: Actividad;
  actividadS!: ActividadSuite;
  index! : number | undefined;
  Show: boolean = true;
  position!: number;
  id! : string;
 
  constructor(
              private fb: FormBuilder,
              private _actividadService: ActividadService,
              private dialogService: DialogService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalActividadComponent>,
              private dateAdapter: DateAdapter<Date>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
                this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
                /*this.form = this.fb.group({
                  fecha: ['',Validators.required],
                  horasEjecutadas: ['',Validators.required],
                  asunto: ['',Validators.required],
                  descripcion: ['',Validators.required],
                  tareaAsociada: ['',Validators.required],
                })*/
                this.form = this._actividadService.form;
               
               }

  listData!: MatTableDataSource<any>;
 

  ngOnInit(){
    this._actividadService.enviarIndexObservable.subscribe(response => {
      this.index = response;
    })
    console.log('index modal fgfg',this.index);
    
    this._actividadService.enviarIdActividadObservable.subscribe(response => {
      this.id = response;
    })
    console.log('id AAAAA',this.id);
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
}

  /*agregarActividad(){
    console.log('antes del if');
    if(this.index == undefined){
      console.log('dps del if');
    console.log(this.form);
    const actividad: Actividad = {
      position: this._actividadService.listActividades.length,
      fecha: this._actividadService.form.value.fecha,
      horas: this._actividadService.form.value.horasEjecutadas,
      children: this._actividadService.form.value.descripcion ,
      asunto: this._actividadService.form.value.asunto,
      tareas: this._actividadService.form.value.tareaAsociada,
  } 
  console.log('descripcion',this._actividadService.form.value.descripcion)
  console.log('actividad',actividad);
  console.log('data',this.data);
  console.log('children',this.form.value.descripcion);
  //console.log('ver qu viene del injext',this.data.descripcion);
  //this._actividadService.initializeFormGroup();
  this._actividadService.form.reset();
  this._actividadService.agregarActividad2(actividad);
    }else{
      //this.editarActividad();
    }
  }*/
  
  /*agregarActividad(){
    console.log('aqui llega agregar ACtivifdd',this.index);
    let act = this._actividadService.getActividad();
    console.log('maxima posicion',act[this._actividadService.listActividades.length-1].position);
    if(this.index == undefined){
    console.log(this._actividadService.listActividades.length);
    const actividad: Actividad = {
      position: act[this._actividadService.listActividades.length-1].position+1,
      fecha: this._actividadService.form.value.fecha,
      horas: this._actividadService.form.value.horasEjecutadas,
      descripcion: this._actividadService.form.value.children,  
      asunto: this._actividadService.form.value.asunto,
      tareas: this._actividadService.form.value.tareaAsociada,
      toggle:this._actividadService.form.value.toggle
  }

  if (actividad.descripcion == null || actividad.descripcion.length < 1){
    actividad.descripcion = ['Esta actividad no tiene descripción'];
  }

  console.log('descripcion',actividad)
    this._actividadService.form.reset();
    
  this._actividadService.agregarActividad2(actividad);
}else{

  }
}*/

//AGREGAR ACTIVIDAD INTEGRACION
agregarActividadSuite(){
 
  if(this.index == undefined){
  
  const actividadS: ActividadSuite = {
    //position: act[this._actividadService.listActividades.length-1].position+1,
    fecha: this._actividadService.form.value.fecha,
    horas_ejecutadas: this._actividadService.form.value.horasEjecutadas,
    //children: this._actividadService.form.value.children,  
    asunto_actividad: this._actividadService.form.value.asunto,
    nombre_tarea: this._actividadService.form.value.tareaAsociada,
    descripcion: this._actividadService.form.value.descripcion,
    par_modo: 'I',
    titulo: this._actividadService.form.value.asunto,
    id_actividad: '',
    estado: '',
    tipo_actividad: '',
    asignado_a: '',
    id_tarea: ''
  }



console.log('ACTIVIDAD SSSS FECHAAA',actividadS.fecha)
  this._actividadService.form.reset()
  
   
      this._actividadService.agregarActividad(actividadS, this.data.idTarea).subscribe((response:any)=>{
        console.log("INSERT EXITOSO", response);
    });
  
  
  
//this._actividadService.agregarActividad2Suite(actividadS);

  
}else{

}


}

  recibirIndex(){
    this.index = this._actividadService.index;
    console.log("RECIBE INDEX",this.index);
  }

  recibirIdActividad(){
    this.id = this._actividadService.id;
    console.log("RECIBE ID",this.id);
  }
  editarActividad(){
    
    console.log('cantidad',this._actividadService.listActividades.length);
    console.log('indexxxx',this.index);
    if(this.index != undefined){
      let aux: number = this.index;
      console.log('la actividad',this._actividadService.listActividades[aux])
      console.log('el form',this.form)

      const actividad: Actividad = {
        //position: this._actividadService.listActividades.length + 1 ,
        position: aux,
        fecha: this.form.value.fecha,
        horas: this.form.value.horasEjecutadas,
        descripcion: this.form.value.children,
        asunto: this.form.value.asunto,
        tareas: this.form.value.tareaAsociada,
        toggle: this.form.value.toggle
    } 
    console.log('descripcion',actividad)
    console.log('la Actividad Seteada',actividad);

    if (actividad.descripcion == null || actividad.descripcion.length < 1){
      actividad.descripcion = ['Esta actividad no tiene descripción'];
    }

    this._actividadService.form.reset();
    //this._actividadService.eliminarActividad(this.index);
    //this._actividadService.agregarActividad2(actividad);
    //this._actividadService.editarActividad(this.index,actividad);
    }
    
    this._actividadService.index = undefined;
    //this._actividadService.form.reset();
  }

editarActividadSuite(){
  if(this.index != undefined){
    let aux: number = this.index;
    /*let dia:number = this._actividadService.form.value.fecha.getDate();
    let mes:number = this._actividadService.form.value.fecha.getMonth();
    let anio:number = this._actividadService.form.value.fecha.getFullYear();
    const fechaA: string = dia+'/'+mes+'/'+anio;*/
    //const fechaAObject = new Date(fechaA);
    //console.log("fechaObject: ",fechaAObject);

    console.log('la actividad',this._actividadService.listActividades[aux])
    console.log('el form',this.form)
    this.recibirIdActividad();
    const actividadS: ActividadSuite = {
      //position: this._actividadService.listActividades.length + 1 ,
      fecha: this._actividadService.form.value.fecha,
    horas_ejecutadas: this._actividadService.form.value.horasEjecutadas,
    //children: this._actividadService.form.value.children,  
    asunto_actividad: this._actividadService.form.value.asunto,
    nombre_tarea: this._actividadService.form.value.tareaAsociada,
    
    descripcion: this._actividadService.form.value.descripcion,
    par_modo: 'U',
    titulo: this._actividadService.form.value.asunto,
    id_actividad: this.id,
    estado: '',
    tipo_actividad: '',
    asignado_a: '',
    id_tarea: 'a0287b5d-14c5-11ed-965a-00505601020a'
  } 
  console.log("fecha modal",actividadS.fecha);

  if (actividadS.descripcion == null || actividadS.descripcion.length < 1){
    actividadS.descripcion = 'Esta actividad no tiene descripción';
  }

  this._actividadService.form.reset();
  
  this._actividadService.editarActividad(actividadS, this.data.idTarea).subscribe((response:any)=>{
    console.log("UPDATE EXITOSO", response);
});
  }


}
  
}
