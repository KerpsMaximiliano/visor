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

  data = new MatTableDataSource(this.dataProyecto.proyectos);
  proyectos: Proyecto[];
  displayedColumns: string[] = ['nombre','tareasATiempo','tareasAtrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Proyecto | null;
  porcentajeBarraVerde: number;
  porcentajeBarraAmarilla: number;
  porcentajeBarraRoja: number;

  constructor(private dataProyecto: ProyectoDataService) {
    this.porcentajeBarraAmarilla = 0;
    this.porcentajeBarraVerde = 0;
    this.porcentajeBarraRoja = 0;
    this.proyectos = this.dataProyecto.proyectos;
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  public calcularPorcentajeBarras(index: number){
    const divRojo = document.getElementById('barraRoja');
    const divAmarilla = document.getElementById('barraAmarilla');
    const divVerde = document.getElementById('barraVerde');
    const porc = "%";
    this.porcentajeBarraAmarilla = this.dataProyecto.proyectos[index].porcentajeTareasEnProgreso;
    this.porcentajeBarraRoja = this.dataProyecto.proyectos[index].porcentajeTareasAtrasadas
    console.log(this.porcentajeBarraRoja)
    if(divAmarilla != null)
    {
      divAmarilla.style.setProperty('width', (this.porcentajeBarraAmarilla.toString()).concat(porc));
    }
    if(divRojo != null){
      divRojo.style.setProperty('width', (this.porcentajeBarraRoja.toString()).concat(porc))
    }
  }

  cargarRojo(): number{
    return this.porcentajeBarraRoja;
  }
}
