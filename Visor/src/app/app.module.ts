import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MyMaterialModule } from './material';

//Modulos internos
import { LoginModule } from './componentes/login/login.module';
import { RecuperarcontraseniaModule } from './componentes/recuperar-contrasenia/recuperar-contrasenia.module';
import { InicioEstadoModule } from './componentes/inicio-estado-proyecto/inicio-estado.module';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/i2t/rest.service';
import { Config } from './services/i2t/config.service';
import { SnackbarService } from './services/util/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { PermisosRolesModule } from './components/configuraciones/permisos-roles/permisos-roles.module';
import { RolesUsuariosModule } from './components/configuraciones/roles-usuarios/roles-usuarios.module';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VistaDisenioTecnicoModule } from './componentes/vista-disenio-tecnico/vista-disenio-tecnico.module';


@NgModule({
  declarations: [
    AppComponent, ConfiguracionesComponent, MatConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    LoginModule,
    InicioEstadoModule,
    HttpClientModule,
    RecuperarcontraseniaModule,
    FormsModule,
    PermisosRolesModule,
    RolesUsuariosModule,
    VistaDisenioTecnicoModule
  ],
  providers: [Config, RestService, MatSnackBar, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

