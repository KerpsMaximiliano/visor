import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './componentes/control-actividad/actividad/actividad.component';

//Componentes
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarcontraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';
import { InicioEstadoProyectoComponent } from './componentes/inicio/inicio-estado-proyecto/inicio-estado-proyecto.component';
import { VistaDisenioTecnicoComponent } from './componentes/vista-disenio-tecnico/vista-disenio-tecnico.component';
import { VistaAnalistaFuncionalComponent } from './componentes/vista-disenio-funcional/vista-analista-funcional.component';
import { InicioMainComponent } from './componentes/inicio/inicio-main/inicio-main.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { PermisosRolesComponent } from './components/configuraciones/permisos-roles/permisos-roles.component';
import { RolesUsuariosComponent } from './components/configuraciones/roles-usuarios/roles-usuarios.component';
import { VistaDesarrolladorComponent } from './componentes/vista-desarrollador/vista-desarrollador.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { TareasComponent } from './components/tareas/tareas.component';
import { SeccionDocumentosComponent } from './componentes/seccion-documentos/seccion-documentos.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "documentos"
  },
  {
    path: "documentos", 
    component: SeccionDocumentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }