import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectoDataService } from '../../services/i2t/proyecto-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Proyecto } from '../../interfaces/proyecto';

@Component({
  selector: 'app-inicio-estado-proyecto',
  templateUrl: './inicio-estado-proyecto.component.html',
  styleUrls: ['./inicio-estado-proyecto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InicioEstadoProyectoComponent implements OnInit {

  data = new MatTableDataSource(this.dataProyecto.proyectos);
  proyectos: Proyecto[];
  displayedColumns: string[] = ['nombre','tareasATiempo','tareasAtrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Proyecto;

  constructor(private dataProyecto: ProyectoDataService, private renderer: Renderer2) {
    this.proyectos = this.dataProyecto.proyectos;
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  cargarAmarilla(index: number): number{  
    return this.dataProyecto.proyectos[index].porcentajeHPEnProgreso;
  }

  cargarVerde(index: number): number{
    return this.dataProyecto.proyectos[index].porcentajeHPCompletadas;
  }

  cargarRojo(index: number): number{
    return this.dataProyecto.proyectos[index].porcentajeHPNoIniciadas;
  }
}
