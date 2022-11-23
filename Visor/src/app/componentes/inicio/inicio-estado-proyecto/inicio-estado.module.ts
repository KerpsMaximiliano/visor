import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { FiltroModule } from 'src/app/shared/modal-filtro-proyectos/filtro-proyectos/filtro.module';
import { InicioEstadoProyectoComponent } from './inicio-estado-proyecto.component';

@NgModule({
  declarations: [InicioEstadoProyectoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    FiltroModule
  ],
  exports: [InicioEstadoProyectoComponent]

})
export class InicioEstadoModule { }
