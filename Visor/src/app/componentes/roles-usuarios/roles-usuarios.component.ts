import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/i2t/usuario.service';

@Component({
  selector: 'app-roles-usuarios',
  templateUrl: './roles-usuarios.component.html',
  styleUrls: ['./roles-usuarios.component.css']
})
export class RolesUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['usuario', 'nombre', 'rol'];

  roles: any[] = [
    { id: 1, nombre: 'Administrador', check: false },
    { id: 2, nombre: 'Supervisor', check: false },
    { id: 3, nombre: 'Operativo', check: false }
  ]


  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarios = this._usuarioService.getUsuarios();
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  marcarCheckbox($event: any) {
    const id = $event.source.id;
    const isChecked = $event.checked;
    const newArray: MatTableDataSource<any> = this.dataSource;

    console.log(id);
    if (id == 'mat-checkbox-1') {
      if (isChecked == true) {
        newArray.filter = 'Administrador';
      }
    }

    /* if (!this.checkAdm) {
      this.checkAdm = true;
      this.dataSource.filter = 'Administrador';
    } else {
      this.checkAdm = false;
      this.dataSource = new MatTableDataSource(this.usuarios);
    } */
  }

  /* marcarCheckboxSup() {
    if (!this.checkSup) {
      this.checkSup = true;
      this.dataSource.filter = 'Supervisor';
    } else {
      this.checkSup = false;
      this.dataSource = new MatTableDataSource(this.usuarios);
    }
  }

  marcarCheckboxOp() {
    if (!this.checkOp) {
      this.checkOp = true;
      this.dataSource.filter = 'Operativo';
    } else {
      this.checkOp = false;
      this.dataSource = new MatTableDataSource(this.usuarios);
    }
  } */

}
