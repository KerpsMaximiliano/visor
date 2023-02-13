// TODO: CORE
import { Component, Input, OnInit, Output } from '@angular/core';

// TODO: SERVICES
import { ProyectoDataService } from 'src/app/services/i2t/proyecto-data.service';

// TODO: INTERFACES
import { IProjectStatus } from '../../interfaces/project-status.interface';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css'],
})
export class ProjectStatusComponent implements OnInit {
  @Input() id!: string;

  data = [0, 0, 0, 0, 0];
  // * Index
  // [0]: defaultData;
  // [1]: notStarted;
  // [2]: inProgress;
  // [3]: inTest;
  // [4]: completed;

  total: number = 0;

  grid = {};

  constructor(private _dataProyecto: ProyectoDataService) {}

  ngOnInit() {
    this._dataProyecto
      .getProjectStatus(this.id, 'TRUE')
      .subscribe((project: IProjectStatus) => {
        for (let i = 0; i < project.dataset.length; i++) {
          if (
            project.dataset[i].Horas !== undefined &&
            project.dataset[i].Horas !== null
          ) {
            switch (project.dataset[i].Estado) {
              default:
                this.data[0] += project.dataset[i].Horas;
                break;
              case 'Not Started':
                this.data[1] += project.dataset[i].Horas;
                break;
              case 'In Progress':
                this.data[2] += project.dataset[i].Horas;
                break;
              case 'In Test':
                this.data[3] += project.dataset[i].Horas;
                break;
              case 'Completed':
                this.data[4] += project.dataset[i].Horas;
                break;
            }
          }
        }

        for (let i = 0; i < this.data.length; i++) {
          this.total += this.data[i];
        }

        this.getPercentage();

        this.grid = {
          display: 'grid',
          'grid-template-columns': ` ${this.gridValidation()}`,
          'min-height': '24px',
        };
      });
  }

  getPercentage() {
    if (this.total !== 0) {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i] = Math.round((100 * this.data[i]) / this.total);
      }
    }
  }

  gridValidation(): string {
    let data: string = ' ';
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== 0) {
        data += `minmax(2rem, ${this.data[i]}%) `;
      }
    }
    return data;
  }
}
