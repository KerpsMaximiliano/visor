import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../../material';
import { VistaAnalistaFuncionalComponent } from './vista-analista-funcional.component';
import { ControlActividadModule } from '../control-actividad/control-actividad.module';



@NgModule({
  declarations: [VistaAnalistaFuncionalComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    ControlActividadModule
  ],
  exports: [VistaAnalistaFuncionalComponent]
})
export class VistaDisenioFuncionalModule { }
