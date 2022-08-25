import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosRolesComponent } from './componentes/permisos-roles/permisos-roles.component';
import { RolesUsuariosComponent } from './componentes/roles-usuarios/roles-usuarios.component';

const routes: Routes = [
  { path: 'roles-usuarios', component: RolesUsuariosComponent },
  { path: 'permisos-roles', component: PermisosRolesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
