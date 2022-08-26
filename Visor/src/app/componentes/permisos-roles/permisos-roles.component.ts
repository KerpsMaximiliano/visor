import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Permiso } from 'src/app/interfaces/permiso';
import { PermisoService } from 'src/app/services/i2t/permiso.service';

@Component({
  selector: 'app-permisos-roles',
  templateUrl: './permisos-roles.component.html',
  styleUrls: ['./permisos-roles.component.css']
})
export class PermisosRolesComponent implements OnInit {

  permisos: Permiso[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['permiso', 'operativo', 'supervisor', 'administrador'];

  constructor(private _permisoSerivce: PermisoService) { }

  ngOnInit(): void {
    this.permisos = this._permisoSerivce.getPermisos();
    this.dataSource = new MatTableDataSource(this.permisos);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
