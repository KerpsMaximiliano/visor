// TODO: CORE
import { Component, OnInit } from '@angular/core';

// TODO: SERVICES
import { ProyectoDataService } from 'src/app/services/i2t/proyecto-data.service';

// TODO: Interfaces
import { IProject } from './interfaces/project.interface';
import { IData } from './interfaces/data.interface';

// TODO: MAT-TABLE && SCROLLING
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

// TODO: ANIMATIONS.
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-test-estado-proyecto',
  templateUrl: './test-estado-proyecto.component.html',
  styleUrls: ['./test-estado-proyecto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TestEstadoProyectoComponent implements OnInit {
  // * Interfaz de la respuesta del servidor a través del método getProyectos();
  projects: IProject[] = [];

  // * Variables que almacenan la información utilizada en el render de la tabla.
  displayedColumns: string[] = ['nombre', 'tiempo', 'atrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IProject;
  data: IData[] = [];
  dataSource!: TableVirtualScrollDataSource<IData>;

  // *
  tareasAtrasadas: number = 0;
  tareasTotales: number = 0;
  disponibilidadProyectos: number = 0;

  constructor(private _dataProyecto: ProyectoDataService) {}

  ngOnInit() {
    this._dataProyecto.getProyectos().subscribe((res: any) => {
      for (let i = 0; i < res.dataset.length; i++) {
        let totales = 0;
        let atrasadas = 0;
        if (res.dataset[i].Tareas_totales !== undefined) {
          totales = res.dataset[i].Tareas_totales;
        }
        if (res.dataset[i].Tareas_atrasadas !== undefined) {
          atrasadas = res.dataset[i].Tareas_atrasadas;
        }
        this.projects.push({
          Id_Caso: res.dataset[i].Id_Caso,
          Caso: res.dataset[i].Caso,
          Numero_Caso: res.dataset[i].Numero_Caso,
          Cliente: res.dataset[i].Cliente,
          Asignado_a: res.dataset[i].Asignado_a,
          Tareas_totales: totales,
          Tareas_atrasadas: atrasadas,
        });
        this.tareasTotales += totales;
        this.tareasAtrasadas += atrasadas;
      }
      this.getPorcent();
      this.dataSource = new TableVirtualScrollDataSource<IData>(this.data);
      this.disponibilidadProyectos = Math.round(
        (this.tareasAtrasadas / this.tareasTotales) * 100
      );
    });
  }

  getPorcent() {
    this.projects.forEach((project) => {
      if (
        project.Tareas_atrasadas !== null &&
        project.Tareas_totales !== null
      ) {
        this.data.push({
          nombre: project.Caso,
          tiempo: Math.round(
            (project.Tareas_atrasadas / project.Tareas_totales) * 100
          ),
          atrasadas: Math.round(
            ((project.Tareas_totales - project.Tareas_atrasadas) /
              project.Tareas_totales) *
              100
          ),
        });
      } else {
        this.data.push({
          nombre: project.Caso,
          tiempo: 0,
          atrasadas: 0,
        });
      }
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
