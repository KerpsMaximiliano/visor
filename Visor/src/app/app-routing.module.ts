import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './componentes/control-actividad/actividad/actividad.component';

//Componentes
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarcontraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';
import { InicioEstadoProyectoComponent } from './componentes/inicio/inicio-estado-proyecto/inicio-estado-proyecto.component';
import { VistaDisenioTecnicoComponent } from './componentes/vista-disenio-tecnico/vista-disenio-tecnico.component';
import { InicioMainComponent } from './componentes/inicio/inicio-main/inicio-main.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { PermisosRolesComponent } from './components/configuraciones/permisos-roles/permisos-roles.component';
import { RolesUsuariosComponent } from './components/configuraciones/roles-usuarios/roles-usuarios.component';
import { VistaDesarrolladorComponent } from './componentes/vista-desarrollador/vista-desarrollador.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { TareasComponent } from './components/tareas/tareas.component';

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
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children:[
      { path: 'inicio', component: InicioMainComponent },
      { path: 'configuraciones', component: ConfiguracionesComponent,
        children: [
        { path: 'roles-usuarios', component: RolesUsuariosComponent },
        { path: 'permisos-roles', component: PermisosRolesComponent }
    ] },
    {path: 'tareas', component: TareasComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
