import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioEstadoProyectoComponent } from './inicio-estado-proyecto.component';
import { MyMaterialModule } from '../../material';
import { FiltroProyectosComponent } from '../../shared/modal-filtro-proyectos/filtro-proyectos/filtro-proyectos.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [InicioEstadoProyectoComponent, FiltroProyectosComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule
  ],
  exports: [InicioEstadoProyectoComponent]

})
export class InicioEstadoModule { }
