import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { PermisosRolesComponent } from './components/configuraciones/permisos-roles/permisos-roles.component';
import { RolesUsuariosComponent } from './components/configuraciones/roles-usuarios/roles-usuarios.component';

const routes: Routes = [
  { path: 'configuraciones-main', component: ConfiguracionesComponent,
    children: [
      { path: 'roles-usuarios', component: RolesUsuariosComponent },
      { path: 'permisos-roles', component: PermisosRolesComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
