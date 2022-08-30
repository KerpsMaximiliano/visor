import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

 
  constructor(
              private fb: FormBuilder,
              private _actividadService: ActividadService,
              private dialogService: DialogService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalActividadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Actividad,
              ) {
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

  agregarActividad(){

    if(this.index == undefined){
      this.type = 'add';
    console.log(this.form);
    const actividad: Actividad = {
      fecha: this._actividadService.form.value.fecha,
      horas: this._actividadService.form.value.horasEjecutadas,
      descripcion: this._actividadService.form.value.descripcion,
      asunto: this._actividadService.form.value.asunto,
      tareas: this._actividadService.form.value.tareaAsociada,
  } 
  console.log(actividad);
  console.log(this.data);
  console.log(this.form.value.fecha);
  //console.log('ver qu viene del injext',this.data.descripcion);
  //this._actividadService.initializeFormGroup();
  this._actividadService.form.reset();
  this._actividadService.agregarActividad2(actividad);
    }else{
      //this.editarActividad();
    }
  
  }

  recibirIndex(){
    this.index = this._actividadService.index;
  }
  editarActividad(){
    //console.log('actividad modal',this._actividadService.listActividades[this.index]);
    console.log('cantidad',this._actividadService.listActividades.length);
    console.log('indexxxx',this.index);
    if(this.index != undefined){
      let aux: number = this.index;
      console.log('la actividad',this._actividadService.listActividades[aux])
      console.log('el form',this.form)

      const actividad: Actividad = {
        fecha: this.form.value.fecha,
        horas: this.form.value.horasEjecutadas,
        descripcion: this.form.value.descripcion,
        asunto: this.form.value.asunto,
        tareas: this.form.value.tareaAsociada,
    } 

    console.log('la Actividad Seteada',actividad);
    this._actividadService.form.reset();
    this._actividadService.eliminarActividad(this.index);
    this._actividadService.agregarActividad2(actividad);
    }
    

    this._actividadService.index = undefined;
    //this._actividadService.form.reset();
    
    
  }
  
  

}
