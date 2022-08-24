import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 
  constructor(public dialogRef: MatDialogRef<ModalActividadComponent>,
              private fb: FormBuilder,
              private _actividadService: ActividadService,
              private dialogService: DialogService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data:any,
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
  this._actividadService.agregarActividad2(actividad);
  
  }

}
