import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { Actividad } from 'src/app/interfaces/actividades';
import { DialogService } from 'src/app/shared/dialog.service';
import { ActividadService } from '../actividad.service';


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
  index! : number | undefined;
  Show: boolean = true;
  position!: number;

 
  constructor(
              private fb: FormBuilder,
              private _actividadService: ActividadService,
              private dialogService: DialogService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalActividadComponent>,
              private dateAdapter: DateAdapter<Date>,
              @Inject(MAT_DIALOG_DATA) public data: Actividad,
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
  
  agregarActividad(){
    console.log('aqui llega agregar ACtivifdd',this.index);
    let act = this._actividadService.getActividad();
    console.log('maxima posicion',act[this._actividadService.listActividades.length-1].position);
    if(this.index == undefined){
    console.log(this._actividadService.listActividades.length);
    const actividad: Actividad = {
      position: act[this._actividadService.listActividades.length-1].position+1,
      fecha: this._actividadService.form.value.fecha,
      horas: this._actividadService.form.value.horasEjecutadas,
      children: this._actividadService.form.value.children,  
      asunto: this._actividadService.form.value.asunto,
      tareas: this._actividadService.form.value.tareaAsociada,
      toggle:this._actividadService.form.value.toggle
  }

  if (actividad.children == null || actividad.children.length < 1){
    actividad.children = ['Esta actividad no tiene descripción'];
  }

  console.log('descripcion',actividad)
    this._actividadService.form.reset();
    
  this._actividadService.agregarActividad2(actividad);
}else{

}
  }

  recibirIndex(){
    this.index = this._actividadService.index;
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
        children: this.form.value.children,
        asunto: this.form.value.asunto,
        tareas: this.form.value.tareaAsociada,
        toggle: this.form.value.toggle
    } 
    console.log('descripcion',actividad)
    console.log('la Actividad Seteada',actividad);

    if (actividad.children == null || actividad.children.length < 1){
      actividad.children = ['Esta actividad no tiene descripción'];
    }

    this._actividadService.form.reset();
    //this._actividadService.eliminarActividad(this.index);
    //this._actividadService.agregarActividad2(actividad);
    this._actividadService.editarActividad(this.index,actividad);
    }
    
    this._actividadService.index = undefined;
    //this._actividadService.form.reset();
  }
  
}
