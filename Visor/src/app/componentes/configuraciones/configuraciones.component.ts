import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  rolesUsuarios() {
    this.router.navigate(['roles-usuarios']);
  }

  permisosRoles() {
    this.router.navigate(['permisos-roles']);
  }

}