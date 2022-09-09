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
  displayedColumns: string[] = ['nombre','tareasATiempo','tareasAtrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Proyecto | null;
  porcentajeBarraVerde: number;
  porcentajeBarraAmarilla: number;
  porcentajeBarraRoja: number;
  porcentajeTareasAtrasadas: number[];

  constructor(private dataProyecto: ProyectoDataService) {
    this.porcentajeBarraAmarilla = 0;
    this.porcentajeBarraVerde = 0;
    this.porcentajeBarraRoja = 0;
    this.porcentajeTareasAtrasadas = [];
    this.rellenarPorcentajes()
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  calcularPorcentaje(index: number){
    const divRojo = document.getElementById('barraRoja');
    const divAmarilla = document.getElementById('barraAmarilla');
    const divVerde = document.getElementById('barraVerde');
    const porc = "%";
  }

  rellenarPorcentajes(){
    for(let i = 0;i<this.porcentajeTareasAtrasadas.length;i++){
      this.porcentajeTareasAtrasadas[i] = (this.dataProyecto.porcentajeAtrasadas[i] * 100);
    }
  }
}
