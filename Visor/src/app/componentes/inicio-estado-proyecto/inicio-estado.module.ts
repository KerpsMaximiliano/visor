import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioEstadoProyectoComponent } from './inicio-estado-proyecto.component';
import { MyMaterialModule } from '../../material';



@NgModule({
  declarations: [InicioEstadoProyectoComponent],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [InicioEstadoProyectoComponent]

})
export class InicioEstadoModule { }
