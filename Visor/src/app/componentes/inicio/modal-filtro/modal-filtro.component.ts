import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-filtro',
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.css']
})
export class ModalFiltroComponent implements OnInit {

  funciones: string[] = [ 'Analista Funcional', 'Analista Tecnico', 'Desarrollador', 'Tester', 'Project Manager' ];
  result = {nombre: '', apellido: '', seleccion: '', filtrar: true, limpiar: false};
  // esta configuracion tienen que quedar guardada en la sesion del usuario ena actividad

  constructor(public dialogRef: MatDialogRef<ModalFiltroComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.result.nombre = this.data.nombre;
    this.result.apellido = this.data.apellido;
    this.result.seleccion = this.data.funcion;
  }

  limpiarCampos() {
    this.result.nombre = '';
    this.result.apellido = '';
    this.result.seleccion = '';
    this.result.limpiar = true;
  }

  cancelarBusqueda(): void {
    this.result.filtrar = false;
    this.dialogRef.close(this.result);
  }

}
