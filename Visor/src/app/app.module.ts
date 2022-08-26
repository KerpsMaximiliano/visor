import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MyMaterialModule } from './material';

//Modulos internos
import { LoginModule } from './components/login/login.module';
import { RecuperarcontraseniaModule } from './components/recuperarcontrasenia/recuperarcontrasenia.module';

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
