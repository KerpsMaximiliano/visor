import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InicioEstadoProyectoComponent } from '../../../componentes/inicio-estado-proyecto/inicio-estado-proyecto.component';

@Component({
  selector: 'app-filtro-proyectos',
  templateUrl: './filtro-proyectos.component.html',
  styleUrls: ['./filtro-proyectos.component.css']
})
export class FiltroProyectosComponent implements OnInit {

  result = {numero: '', nombre: '', asignadoA: '', cliente: '', filtrar: true, limpiar: false}
  activarBoton: boolean;


  constructor(public dialogRef: MatDialogRef<InicioEstadoProyectoComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.activarBoton = true;
   }

  ngOnInit(): void {
    this.result.numero = this.data.numero;
    this.result.cliente = this.data.cliente;
    this.result.asignadoA = this.data.asignadoA;
    this.result.nombre = this.data.nombre;
  }

  limpiarCampos() {
    this.result.nombre = '';
    this.result.cliente = '';
    this.result.asignadoA = '';
    this.result.numero = '';
    this.result.limpiar = true;
  }

  cancelarBusqueda(): void {
    this.result.filtrar = false;
    this.dialogRef.close(this.result);
  }

  activarBotones(){
    this.activarBoton = false;
  }
}
