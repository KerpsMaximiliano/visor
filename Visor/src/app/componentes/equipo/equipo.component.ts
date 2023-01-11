import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/colaborador';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  colaborador!: Colaborador;

  constructor() { }

  ngOnInit(): void {
  }

}
