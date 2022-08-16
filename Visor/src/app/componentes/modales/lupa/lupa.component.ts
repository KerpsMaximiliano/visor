import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, InicioProyectosComponent } from '../../inicio-proyectos/inicio-proyectos.component';

export interface Proyecto {
  id: number;
  nombre: string;
  planificadas: number;
  noIniciadas: number;
  enProgreso: number;
  enPrueba: number;
  completadas: number;
}

@Component({
  selector: 'app-lupa',
  templateUrl: './lupa.component.html',
  styleUrls: ['./lupa.component.css']
})
export class LupaComponent {

  filterPost = '';

  proyectos: Proyecto[] = [
    { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0 },
    { id: 125029, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400 },
    { id: 124192, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640 },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184 }
  ];
  proyectosMostrados: Proyecto[] = [];

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

}
