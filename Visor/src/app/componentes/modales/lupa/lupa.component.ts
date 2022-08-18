import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, InicioProyectosComponent } from '../../inicio-proyectos/inicio-proyectos.component';
import { MatTableDataSource } from '@angular/material/table';
import { asapScheduler } from 'rxjs';

export interface Proyecto {
  id: number;
  nombre: string;
  planificadas: number;
  noIniciadas: number;
  enProgreso: number;
  enPrueba: number;
  completadas: number;
  tieneTareasUsuario: boolean;
  cliente: string;
  asignadoA: string;
}

@Component({
  selector: 'app-lupa',
  templateUrl: './lupa.component.html',
  styleUrls: ['./lupa.component.css']
})
export class LupaComponent {

  proyectos: Proyecto[] = [
    { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
    { id: 125029, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    { id: 124192, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' }
  ];

  columnas: string[] = ['nombre'];
  dataSource = new MatTableDataSource(this.proyectos);

  misProyectos = false;
  options = this._formBuilder.group({
    hideRequired: this.misProyectos
  });
  

  constructor(
    private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<InicioProyectosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  marcarCheckbox() {
    if (this.misProyectos) {
      this.misProyectos = false;
    } else {
      this.misProyectos = true;
    }
    this.dataSource.filter = this.misProyectos.toString();
  }

  seleccionarProyecto(proy: Object) {
    console.log(proy);
  }

}
