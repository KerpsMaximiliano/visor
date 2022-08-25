import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/interfaces/usuario.service';

@Component({
  selector: 'app-roles-usuarios',
  templateUrl: './roles-usuarios.component.html',
  styleUrls: ['./roles-usuarios.component.css']
})
export class RolesUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['usuario', 'nombre', 'rol'];

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarios = this._usuarioService.getUsuarios();
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

}
