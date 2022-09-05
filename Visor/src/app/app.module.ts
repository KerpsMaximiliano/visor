import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MyMaterialModule } from './material';

//Modulos internos
import { LoginModule } from './components/login/login.module';
import { RecuperarcontraseniaModule } from './components/recuperar-contrasenia/recuperar-contrasenia.module';
import { InicioMainComponent } from './componentes/inicio/inicio-main/inicio-main.component';
import { InicioDisponibilidadColaboradoresModule } from './componentes/inicio/inicio-disponibilidad-colaboradores/inicio-disponibilidad-colaboradores.module';


@NgModule({
  declarations: [
    AppComponent,
    InicioMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    LoginModule,
    RecuperarcontraseniaModule,
    InicioDisponibilidadColaboradoresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
