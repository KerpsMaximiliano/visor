import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  selector: 'app-inicio-proyectos',
  templateUrl: './inicio-proyectos.component.html',
  styleUrls: ['./inicio-proyectos.component.css']
})
export class InicioProyectosComponent implements OnInit {

  controlProy = new FormControl;
  options: Proyecto[] = [
    { id: 128109, nombre: 'Entrenamiento en Drupal y Symfony', planificadas: 448, noIniciadas: 424, enProgreso: 24, enPrueba: 0, completadas: 0 },
    { id: 125029, nombre: 'Restyling y Migración de Portal PAC', planificadas: 3600, noIniciadas: 500, enProgreso: 0, enPrueba: 0, completadas: 2400 },
    { id: 124192, nombre: 'Sala de Sorteos - Extractos Digitales', planificadas: 2400, noIniciadas: 492, enProgreso: 200, enPrueba: 0, completadas: 1640 },
    { id: 127230, nombre: 'Visor - Panel de control', planificadas: 1040, noIniciadas: 394, enProgreso: 126, enPrueba: 0, completadas: 184 }
  ];
  filteredOptions: Observable<Proyecto[]>;

  constructor() { this.filteredOptions = this.controlProy.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.name;
      return name ? this._filter(name as string) : this.options.slice();
    }),
  ); }

  ngOnInit(): void {  }

  displayFn(user: Proyecto): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): Proyecto[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  abrirModal() {
    // Abre modal de búsqueda con mas filtros
    console.log("ABRIENDO MODAL");
  }

}