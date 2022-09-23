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
import { InicioEstadoModule } from './componentes/inicio-estado-proyecto/inicio-estado.module';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    LoginModule,
    RecuperarcontraseniaModule,
    HttpClientModule,
    InicioEstadoModule,
    HttpClientModule
  ],

  //Proveedores agregados
  providers: [RestService, LoginService, Config, SnackbarService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
