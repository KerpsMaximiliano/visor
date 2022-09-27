import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { PermisosRolesComponent } from './components/configuraciones/permisos-roles/permisos-roles.component';
import { RolesUsuariosComponent } from './components/configuraciones/roles-usuarios/roles-usuarios.component';

//Componentes
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarcontraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "recuperar-contraseña",
    component: RecuperarcontraseniaComponent
  },
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
