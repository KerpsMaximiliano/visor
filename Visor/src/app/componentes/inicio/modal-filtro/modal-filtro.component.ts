import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-filtro',
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.css']
})
export class ModalFiltroComponent implements OnInit {

  funciones: string[] = [ 'Analista Funcional', 'Analista Técnico', 'Desarrollador', 'Tester', 'Project Manager' ]
  seleccion?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
