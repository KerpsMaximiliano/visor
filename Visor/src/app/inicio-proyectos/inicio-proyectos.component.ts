import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Proyecto {
  name: string;
}

@Component({
  selector: 'app-inicio-proyectos',
  templateUrl: './inicio-proyectos.component.html',
  styleUrls: ['./inicio-proyectos.component.css']
})
export class InicioProyectosComponent implements OnInit {

  controlProy = new FormControl;
  options: Proyecto[] = [
    { name: 'Entrenamiento en Drupal y Symfony' },
    { name: 'Sala de Sorteos - Extractos Digitales' },
    { name: 'Visor - Panel de control' }
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
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Proyecto[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}