import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Colaborador {
  nombre: string;
  rol: string;
  capacidad: number;
  disponibilidad: number;
  planificadas: number;
}

@Component({
  selector: 'app-inicio-equipo',
  templateUrl: './inicio-equipo.component.html',
  styleUrls: ['./inicio-equipo.component.css']
})
export class InicioEquipoComponent implements OnInit {

  myControl = new FormControl;
  colaboradores: Colaborador[] = [
    { nombre: 'Facundo Ghio Serra', rol: 'Analista Funcional', capacidad: 120, disponibilidad: 72, planificadas: 48 },
    { nombre: 'Franco Friggeri', rol: 'Analista Técnico', capacidad: 120, disponibilidad: 12, planificadas: 108 },
    { nombre: 'Federico Gauchat', rol: 'Programador', capacidad: 120, disponibilidad: 42, planificadas: 78 },
    { nombre: 'Luciano De Giorgio', rol: 'Tester', capacidad: 120, disponibilidad: 30, planificadas: 90 }
  ];
  filteredOptions2: Observable<Colaborador[]>;
  
  constructor() { this.filteredOptions2 = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.name;
      return name ? this._filter(name as string) : this.colaboradores.slice();
    }),
  ); }

  ngOnInit(): void {
  }

  displayFn2(user: Colaborador): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): Colaborador[] {
    const filterValue = name.toLowerCase();

    return this.colaboradores.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

}