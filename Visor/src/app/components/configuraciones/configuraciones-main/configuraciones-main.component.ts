import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermisoService } from 'src/app/services/i2t/permiso.service';
import { UsuarioService } from 'src/app/services/i2t/usuario-rol.service';

@Component({
  selector: 'app-configuraciones-main',
  templateUrl: './configuraciones-main.component.html',
  styleUrls: ['./configuraciones-main.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  constructor(private router: Router, private _usuarioService: UsuarioService, private _permisoService: PermisoService) { }

  ngOnInit(): void {
    this._usuarioService.iniciarUsuarios();
    this._permisoService.iniciarPermisos();
  }

  rolesUsuarios() {
    this.router.navigate(['configuraciones-main/roles-usuarios']);
  }

  permisosRoles() {
    this.router.navigate(['configuraciones-main/permisos-roles']);
  }

}