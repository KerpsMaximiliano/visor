import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioEstadoProyectoComponent } from './inicio-estado-proyecto.component';
import { MyMaterialModule } from '../../material';
import { BarraModule } from '../barra/barra.module';



@NgModule({
  declarations: [InicioEstadoProyectoComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    BarraModule
  ],
  exports: [InicioEstadoProyectoComponent]

})
export class InicioEstadoModule { }
