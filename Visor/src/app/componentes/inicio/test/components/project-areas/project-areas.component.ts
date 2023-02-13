// TODO: CORE
import { Component, Input, OnInit } from '@angular/core';

// TODO: SERVICES
import { ProyectoDataService } from 'src/app/services/i2t/proyecto-data.service';

// TODO: INTERFACES
import { IProjectAreas } from '../../interfaces/project-areas.interface';

@Component({
  selector: 'app-project-areas',
  templateUrl: './project-areas.component.html',
  styleUrls: ['./project-areas.component.css'],
})
export class ProjectAreasComponent implements OnInit {
  @Input() id!: string;

  title = [
    'Diseño funcional',
    'Diseño técnico',
    'Desarrollo',
    'Testing',
    'Default',
  ];

  data = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  // * Index
  // [0]: Desing;
  // [1]: Requirements;
  // [2]: Production;
  // [3]: Testing;
  // [4]: defaultData;

  // * Sub-Index
  // [?][0]: defaultData;
  // [?][1]: notStarted;
  // [?][2]: inProgress;
  // [?][3]: inTest;
  // [?][4]: completed;

  total = [0, 0, 0, 0, 0];
  // * Index
  // [0]: defaultData;
  // [1]: notStarted;
  // [2]: inProgress;
  // [3]: inTest;
  // [4]: completed;

  grid = [{}, {}, {}, {}, {}];
  // * Index
  // [0]: Diseño funcional.
  // [1]: Diseño técnico.
  // [2]: Desarrollo.
  // [3]: Testing.
  // [4]: Default.

  constructor(private _dataProyecto: ProyectoDataService) {}

  ngOnInit() {
    this._dataProyecto
      .getProjectAreas(this.id, 'TRUE')
      .subscribe((project: IProjectAreas) => {
        for (let i = 0; i < project.dataset.length; i++) {
          if (
            project.dataset[i].Horas !== undefined &&
            project.dataset[i].Horas !== null
          ) {
            switch (project.dataset[i].Area) {
              case 'Desing':
                this.getStatus(
                  0,
                  project.dataset[i].Estado,
                  project.dataset[i].Horas
                );
                break;
              case 'Requirements':
                this.getStatus(
                  1,
                  project.dataset[i].Estado,
                  project.dataset[i].Horas
                );
                break;
              case 'Production':
                this.getStatus(
                  2,
                  project.dataset[i].Estado,
                  project.dataset[i].Horas
                );
                break;
              case 'Testing':
                this.getStatus(
                  3,
                  project.dataset[i].Estado,
                  project.dataset[i].Horas
                );
                break;
              default:
                this.getStatus(
                  4,
                  project.dataset[i].Estado,
                  project.dataset[i].Horas
                );
                break;
            }
          }
        }

        for (let i = 0; i < this.data.length; i++) {
          for (let j = 0; j < this.data[i].length; j++) {
            this.total[i] += this.data[i][j];
          }
        }

        this.getPercentage();

        for (let i = 0; i < this.data.length; i++) {
          this.grid[i] = {
            display: 'grid',
            'grid-template-columns': ` ${this.gridValidation(i)}`,
            'min-height': '24px',
          };
        }
      });
  }

  getStatus(pos: number, status: string, amount: number) {
    switch (status) {
      default:
        this.data[pos][0] += amount;
        break;
      case 'Not Started':
        this.data[pos][1] += amount;
        break;
      case 'In Progress':
        this.data[pos][2] += amount;
        break;
      case 'In Test':
        this.data[pos][3] += amount;
        break;
      case 'Completed':
        this.data[pos][4] += amount;
        break;
    }
  }

  getPercentage() {
    for (let i = 0; i < this.total.length; i++) {
      if (this.total[i] !== 0) {
        for (let j = 0; j < this.data.length; j++) {
          this.data[i][j] = Math.round((100 * this.data[i][j]) / this.total[i]);
        }
      }
    }
  }

  gridValidation(pos: number): string {
    let data: string = ' ';
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[pos][i] !== 0) {
        data += `minmax(2rem, ${this.data[pos][i]}%) `;
      }
    }
    return data;
  }
}
