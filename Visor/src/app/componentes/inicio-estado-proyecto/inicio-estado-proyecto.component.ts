import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectoDataService } from '../../services/i2t/proyecto-data.service';

@Component({
  selector: 'app-inicio-estado-proyecto',
  templateUrl: './inicio-estado-proyecto.component.html',
  styleUrls: ['./inicio-estado-proyecto.component.css']
})
export class InicioEstadoProyectoComponent implements OnInit {

  data = new MatTableDataSource(this.dataProyecto.proyectos);
  displayedColumns: string[] = ['proyectos'];

  constructor(private dataProyecto: ProyectoDataService) {}

  ngOnInit(): void {
  }

}
