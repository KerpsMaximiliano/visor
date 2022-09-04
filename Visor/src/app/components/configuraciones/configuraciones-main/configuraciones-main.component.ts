import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuraciones-main',
  templateUrl: './configuraciones-main.component.html',
  styleUrls: ['./configuraciones-main.component.css']
})
export class ConfiguracionesComponent {

  constructor(private router: Router) { }

  rolesUsuarios() {
    this.router.navigate(['configuraciones-main/roles-usuarios']);
  }

  permisosRoles() {
    this.router.navigate(['configuraciones-main/permisos-roles']);
  }

}