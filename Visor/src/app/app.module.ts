import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material
import { MyMaterialModule } from './material';

// Componentes
import { InicioProyectosComponent } from './componentes/inicio-proyectos/inicio-proyectos.component';
import { InicioEquipoComponent } from './componentes/inicio-equipo/inicio-equipo.component';
import { LupaComponent } from './componentes/modales/lupa/lupa.component';
import { FiltroComponent } from './componentes/modales/filtro/filtro.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioProyectosComponent,
    InicioEquipoComponent,
    LupaComponent,
    FiltroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
