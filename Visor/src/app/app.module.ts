import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MyMaterialModule } from './material';

// Módulos
import { VistaDisenioTecnicoModule } from './componentes/vista-disenio-tecnico/vista-disenio-tecnico.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    VistaDisenioTecnicoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
