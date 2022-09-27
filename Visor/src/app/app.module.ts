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
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/i2t/rest.service';
import { LoginService } from './services/i2t/login.service';
import { Config } from './services/i2t/config.service';
import { SnackbarService } from './services/util/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InicioMainComponent } from './componentes/inicio/inicio-main/inicio-main.component';
import { InicioDisponibilidadColaboradoresModule } from './componentes/inicio/inicio-disponibilidad-colaboradores/inicio-disponibilidad-colaboradores.module';
import { FormsModule } from '@angular/forms';
import { ModalFiltroComponent } from './componentes/inicio/modal-filtro/modal-filtro.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule,
    InicioDisponibilidadColaboradoresModule,
    FormsModule
  ],

  //Proveedores agregados
  providers: [RestService, LoginService, Config, SnackbarService, MatSnackBar, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
