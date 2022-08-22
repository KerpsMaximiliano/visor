import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Colaborador } from 'src/app/interfaces/colaborador';

@Component({
  selector: 'app-inicio-equipo',
  templateUrl: './inicio-equipo.component.html',
  styleUrls: ['./inicio-equipo.component.css']
})
export class InicioEquipoComponent {

  myControl = new FormControl;
  colaboradores: Colaborador[] = [
    { nombre: 'Facundo Ghio Serra', rol: 'Analista Funcional', capacidad: 120, disponibilidad: 72, planificadas: 48 },
    { nombre: 'Patricio Macagno', rol: 'Analista Funcional', capacidad: 120, disponibilidad: 35, planificadas: 65 },
    { nombre: 'Franco Friggeri', rol: 'Analista Técnico', capacidad: 120, disponibilidad: 12, planificadas: 108 },
    { nombre: 'Federico Gauchat', rol: 'Desarrollador', capacidad: 120, disponibilidad: 42, planificadas: 78 }
  ];
  filteredOptions2: Observable<Colaborador[]>;
  
  constructor() {
    // En el constructor se setea el autocompletado y sugerencia de búsqueda
    this.filteredOptions2 = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.name;
      return name ? this._filter(name as string) : this.colaboradores.slice();
    }),
  ); }

  displayFn2(user: Colaborador): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): Colaborador[] {
    const filterValue = name.toLowerCase();

    return this.colaboradores.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  // Retorna la saturacion actual
  getSaturacion(hsPlanificadas: number) {
    return Math.round(hsPlanificadas / 120 * 100);
  }

  // Pinta el div de color verde si cumple la condicion
  getSatVerde(hsPlanificadas: number) {
    return this.getSaturacion(hsPlanificadas) < 51;
  }

  // Pinta el div de color amarillo si cumple la condicion
  getSatAma(hsPlanificadas: number) {
    return this.getSaturacion(hsPlanificadas) > 50 && this.getSaturacion(hsPlanificadas) < 81;
  }

  // Pinta el div de color rojo si cumple la condicion
  getSatRoja(hsPlanificadas: number) {
    return this.getSaturacion(hsPlanificadas) > 81 && this.getSaturacion(hsPlanificadas) < 101;
  }

  abrirModal() {
    // Abre modal filtro con mas opciones de búsqueda
  }

}