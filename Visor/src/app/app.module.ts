import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



//Material
import { MyMaterialModule } from './material';


// Componentes
import { LoginModule } from './componentes/login/login.module';
import { RecuperarcontraseniaModule } from './componentes/recuperar-contrasenia/recuperar-contrasenia.module';
import { InicioEstadoModule } from './componentes/inicio-estado-proyecto/inicio-estado.module';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/i2t/rest.service';
import { Config } from './services/i2t/config.service';
import { SnackbarService } from './services/util/snackbar.service';
import { ModalcontraseniaComponent } from './shared/modal-contrasenia/modalcontrasenia.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { PermisosRolesModule } from './components/configuraciones/permisos-roles/permisos-roles.module';
import { RolesUsuariosModule } from './components/configuraciones/roles-usuarios/roles-usuarios.module';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { VistaDisenioTecnicoModule } from './componentes/vista-disenio-tecnico/vista-disenio-tecnico.module';
import { ModalFiltroComponent } from './componentes/inicio/modal-filtro/modal-filtro.component';
import { InicioMainComponent } from './componentes/inicio/inicio-main/inicio-main.component';
import { InicioDisponibilidadColaboradoresModule } from './componentes/inicio/inicio-disponibilidad-colaboradores/inicio-disponibilidad-colaboradores.module';
import { VistaDesarrolladorModule } from './componentes/vista-desarrollador/vista-desarrollador.module';
import { TareasModule } from './components/tareas/tareas.module';
import { DialogModule } from './components/dialog/dialog.module';

export function initConfig(config: Config) {
  return () => config.load();
}

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ControlActividadModule } from 'src/app/componentes/control-actividad/control-actividad.module';
import { SharedModule } from './shared/shared.module';
import { LoginService } from './services/i2t/login.service';


@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionesComponent,
    MatConfirmDialogComponent,
    ModalcontraseniaComponent,
    InicioMainComponent,
    ModalFiltroComponent,
    TopbarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    LoginModule,
    InicioEstadoModule,
    HttpClientModule,
    VistaDisenioTecnicoModule,
    InicioDisponibilidadColaboradoresModule,
    FormsModule,
    VistaDesarrolladorModule,
    TareasModule,
    DialogModule,
    ControlActividadModule,
    SharedModule,
    RecuperarcontraseniaModule
  ],

  //Proveedores agregados
  providers: [RestService, LoginService, Config, MatSnackBar, SnackbarService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

