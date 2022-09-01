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

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    LoginModule,
    RecuperarcontraseniaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
