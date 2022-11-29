import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-alta-tarea-dialog',
  templateUrl: './alta-tarea-dialog.component.html',
  styleUrls: ['./alta-tarea-dialog.component.css']
})
export class AltaTareaDialogComponent implements OnInit {

  tipoTareaSeleccionada: String = '';
  estadoTareaSeleccionado: String = '';
  prioridadSeleccionada: String = '';
  fromAltaTarea: boolean = false;

  constructor(public dialogRef: MatDialogRef<AltaTareaDialogComponent>) { }

  ngOnInit(): void {
  }

  selectTipoTarea(tipoTarea: MatSelectChange){
    console.log(tipoTarea)
  }
  selectEstadoTarea(estado: MatSelectChange){
    console.log(estado)
  }
  selectPrioridad(prioridad: MatSelectChange){
    console.log(prioridad)
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}
