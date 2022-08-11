import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MyMaterialModule } from './material';
import { VistaAnalistaModule } from './vista-analista-funcional/modules/vista-analista.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    VistaAnalistaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
