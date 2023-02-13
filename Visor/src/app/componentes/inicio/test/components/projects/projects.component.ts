// * CORE
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

// * SERVICES
import { ProyectoDataService } from 'src/app/services/i2t/proyecto-data.service';

// * INTERFACES
import { IProjects, Dataset } from '../../interfaces/projects.interface';

// * MAT-TABLE && VIRTUAL-SCROLLING
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

// * ANIMATIONS.
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'collapsed <=> expanded',
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {
  // * Información de la tabla.
  displayedColumns: string[] = ['nombre', 'tiempo', 'atrasadas'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Dataset[];
  data: IProjects['dataset'] = [];
  dataSource!: TableVirtualScrollDataSource<Dataset>;
  dataCheck: boolean = false;

  // * Información del estado de los proyectos.
  projectAvailability: number = 0;

  // * Información de tareas atrasadas y tareas totales de todos los proyectos.
  totalTasks: number = 0;
  lateTasks: number = 0;

  constructor(private _dataProyecto: ProyectoDataService) {}

  ngOnInit() {
    this._dataProyecto.getProjects().subscribe((res: IProjects) => {
      this.loadDataSource(res.dataset);
      this.dataSource = new TableVirtualScrollDataSource<Dataset>(this.data);
      this.dataCheck = true;
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDataSource(res: IProjects['dataset']) {
    for (let i = 0; i < res.length; i++) {
      let data = this.dataValidation(res[i]);
      this.totalTasks += data.Tareas_totales;
      this.lateTasks += data.Tareas_atrasadas;
      this.data.push({
        Id_Caso: data.Id_Caso,
        Caso: data.Caso,
        Numero_Caso: data.Numero_Caso,
        Cliente: data.Cliente,
        Asignado_a: data.Asignado_a,
        Tareas_totales: data.Tareas_totales,
        Tareas_atrasadas: data.Tareas_atrasadas,
      });
      this.projectStatus(this.lateTasks, this.totalTasks);
    }
  }

  dataValidation(data: Dataset) {
    return {
      Id_Caso: this.stringValidation(data.Id_Caso),
      Caso: this.stringValidation(data.Caso),
      Numero_Caso: this.numberValidation(data.Numero_Caso),
      Cliente: this.stringValidation(data.Cliente),
      Asignado_a: this.stringValidation(data.Asignado_a),
      Tareas_totales: this.numberValidation(data.Tareas_totales),
      Tareas_atrasadas: this.numberValidation(data.Tareas_atrasadas),
    };
  }

  numberValidation(data: number | undefined) {
    let value: number = 0;
    if (data !== undefined && data !== null) {
      value = data;
    }
    return value;
  }

  stringValidation(data: string | undefined) {
    let value: string = '';
    if (data !== undefined && data !== null) {
      value = data;
    }
    return value;
  }

  projectStatus(lateTasks: number, totalTasks: number) {
    this.projectAvailability = Math.round((lateTasks / totalTasks) * 100);
  }
}
