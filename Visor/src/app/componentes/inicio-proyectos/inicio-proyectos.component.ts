import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LupaComponent } from '../modales/lupa/lupa.component';
import { Proyecto } from 'src/app/interfaces/proyecto';

@Component({
  selector: 'app-inicio-proyectos',
  templateUrl: './inicio-proyectos.component.html',
  styleUrls: ['./inicio-proyectos.component.css']
})
export class InicioProyectosComponent {

  numero!: number;
  nombre!: string;
  cliente!: string;
  asignadoA!: string;
  misProyectos!: boolean;  

  controlProy = new FormControl;
  options: Proyecto[] = [
    { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
    { id: 125029, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400, tieneTareasUsuario: false, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' },
    { id: 124192, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Adrian Enrico' },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184, tieneTareasUsuario: true, cliente: 'Factory', asignadoA: 'Patricio Hernán Macagno' }
  ];
  filteredOptions: Observable<Proyecto[]>;

  constructor(public dialog: MatDialog) { 
    // En el constructor se setea el autocompletado y sugerencia de búsqueda
    this.filteredOptions = this.controlProy.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.name;
      return name ? this._filter(name as string) : this.options.slice();
    }),
  ); }

  displayFn(user: Proyecto): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): Proyecto[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  abrirModal(): void {
    // Abre modal lupa con mas opciones de búsqueda
    const dialogRef = this.dialog.open(LupaComponent, {
      width: '550px',
      data: {
        numero: this.numero,
        nombre: this.nombre,
        cliente: this.cliente,
        asignadoA: this.asignadoA,
        misProyectos: this.misProyectos
      }
    });

    // Cierra modal y se suscribe a la respuesta con el proyecto elegido
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);
      this.numero = result.numero;
      this.nombre = result.nombre;
      this.cliente = result.cliente;
      this.asignadoA = result.asignadoA;
      this.misProyectos = result.misProyectos;
    });
  }

}