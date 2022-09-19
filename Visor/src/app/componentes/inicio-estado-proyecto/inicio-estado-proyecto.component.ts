import { Component, OnInit } from '@angular/core';
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

  lala: string = 'hola';
  data = new MatTableDataSource(this.dataProyecto.proyectos);
  proyectos: Proyecto[];
  displayedColumns: string[] = ['nombre','tareasATiempo','tareasAtrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Proyecto;

  constructor(private dataProyecto: ProyectoDataService) {
    this.proyectos = this.dataProyecto.proyectos;
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  retornarPorcentajeCompletadas(index: number): number{
    return this.dataProyecto.proyectos[index].porcentajeHPCompletadas;
  }

  retornarPorcentajeNoIniciadas(index: number){
    return this.dataProyecto.proyectos[index].porcentajeHPNoIniciadas;
  }

  retornarPorcentajeEnProgreso(index: number){
    return this.dataProyecto.proyectos[index].porcentajeHPEnProgreso;
  }

  retornarPorcentajeEnPrueba(index: number): number{
    return this.dataProyecto.proyectos[index].porcentajeHPEnPrueba;
  }

  retornarPorcentajeAvanceFuncionalCompletadas(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeCompletadas  
  }

  retornarPorcentajeAvanceFuncionalNoIniciadas(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeNoIniciadas;
  }

  retornarPorcentajeAvanceFuncionalEnProgreso(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeEnProgreso;
  }

  retornarPorcentajeAvanceFuncionalEnPrueba(index: number): number{
    return this.dataProyecto.proyectos[index].avanceDisenioFuncional.porcentajeEnPrueba;
  }
}
