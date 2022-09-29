import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioEstadoProyectoComponent } from './inicio-estado-proyecto.component';
import { MyMaterialModule } from '../../material';
import { FormsModule } from '@angular/forms';
import { FiltroModule } from '../../shared/modal-filtro-proyectos/filtro-proyectos/filtro.module';

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
