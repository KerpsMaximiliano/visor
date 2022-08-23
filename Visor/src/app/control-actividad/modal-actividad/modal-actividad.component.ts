import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table/table-data-source';
import { Actividad } from 'src/app/interfaces/actividades';
import { DialogService } from 'src/app/shared/dialog.service';
import { ActividadService } from '../actividad.service';
import { ActividadComponent } from '../actividad/actividad.component';


@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styleUrls: ['./modal-actividad.component.css']
})
export class ModalActividadComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  form: FormGroup;
  
  
 
  constructor(public dialogRef: MatDialogRef<ModalActividadComponent>,
              private fb: FormBuilder,
              private _actividadService: ActividadService
              ) {
                this.form = this.fb.group({
                  fecha: ['',Validators.required],
                  horasEjecutadas: ['',Validators.required],
                  asunto: ['',Validators.required],
                  descripcion: ['',Validators.required],
                  tareaAsociada: ['',Validators.required],
                })
               }

  listData!: MatTableDataSource<any>;
 

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

  /*agregarActividad(){
 
    const actividad: Actividad = {
        fecha: this.form.value.fecha,
        horas: this.form.value.horasEjecutadas,
        descripcion: this.form.value.descripcion,
        asunto: this.form.value.asunto,
        tareas: this.form.value.tareaAsociada,
    }
    
    this._actividadService.agregarUsuario(actividad);
    
  }*/

  agregarActividad(){
    console.log(this.form);
    const actividad: Actividad = {
      fecha: this.form.value.fecha,
      horas: this.form.value.horasEjecutadas,
      descripcion: this.form.value.descripcion,
      asunto: this.form.value.asunto,
      tareas: this.form.value.tareaAsociada,
  }
  console.log(actividad);
  }
  

  /*agregarUsuario(){
    this.actividadService.openModalDialog()
    .afterClosed().subscribe(res =>{
      console.log(this.form);
    });
  }*/
  

}
