import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-filtro',
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.css']
})
export class ModalFiltroComponent {

  funciones: string[] = [ 'Analista Funcional', 'Analista Tecnico', 'Desarrollador', 'Tester', 'Project Manager' ];
  result = {nombre: '', apellido: '', seleccion: '', filtrar: true};

  constructor(public dialogRef: MatDialogRef<ModalFiltroComponent>) { }

  limpiarCampos() {
    this.result.nombre = '';
    this.result.apellido = '';
    this.result.seleccion = '';
  }

  cancelarBusqueda(): void {
    this.result.filtrar = false;
    this.dialogRef.close(this.result);
  }

}
