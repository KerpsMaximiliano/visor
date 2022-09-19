import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MyMaterialModule } from './material';

// Componentes
import { LoginModule } from './componentes/login/login.module';
import { RecuperarcontraseniaModule } from './componentes/recuperar-contrasenia/recuperar-contrasenia.module';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { RolesUsuariosModule } from './components/configuraciones/roles-usuarios/roles-usuarios.module';
import { PermisosRolesModule } from './components/configuraciones/permisos-roles/permisos-roles.module';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { RestService } from './services/i2t/rest.service';
import { LoginService } from './services/i2t/login.service';
import { Config } from './services/i2t/config.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './services/util/snackbar.service';
import { LoginComponent } from './components/login/login.component';
import { RecuperarContraseniaComponent } from './components/recuperar-contrasenia/recuperar-contrasenia.component';
import { ModalContraseniaComponent } from './shared/modal-contrasenia/modalcontrasenia.component';
import { ModalcontraseniaComponent } from './shared/modal-contrasenia/modalcontrasenia.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionesComponent,
    MatConfirmDialogComponent,
    LoginComponent,
    RecuperarContraseniaComponent,
    ModalContraseniaComponent,
    ModalcontraseniaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    LoginModule,
    RecuperarcontraseniaModule,
    RolesUsuariosModule,
    PermisosRolesModule,
    HttpClientModule
  ],
  providers: [RestService, LoginService, Config, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
