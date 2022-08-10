import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inicio-proyectos',
  templateUrl: './inicio-proyectos.component.html',
  styleUrls: ['./inicio-proyectos.component.css']
})
export class InicioProyectosComponent implements OnInit {

  options: string[] = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3'];

  constructor() {  }

  ngOnInit(): void {
  }

}