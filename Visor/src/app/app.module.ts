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
import { ModalcontraseniaComponent } from './shared/modal-contrasenia/modalcontrasenia.component';

export function initConfig(config: Config) {
  return () => config.load();
}
import { InicioMainComponent } from './componentes/inicio/inicio-main/inicio-main.component';
import { InicioDisponibilidadColaboradoresModule } from './componentes/inicio/inicio-disponibilidad-colaboradores/inicio-disponibilidad-colaboradores.module';
import { FormsModule } from '@angular/forms';
import { ModalFiltroComponent } from './componentes/inicio/modal-filtro/modal-filtro.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { InicioDisponibilidadColaboradores2Module } from './componentes/inicio/inicio-disponibilidad-colaboradores2/inicio-disponibilidad-colaboradores2.module';


@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionesComponent,
    MatConfirmDialogComponent,
    ModalcontraseniaComponent,
    InicioMainComponent,
    ModalFiltroComponent
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
    HttpClientModule,
    InicioDisponibilidadColaboradoresModule,
    FormsModule,
    InicioDisponibilidadColaboradores2Module
  ],

  //Proveedores agregados
  providers: [RestService, LoginService, Config, SnackbarService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
