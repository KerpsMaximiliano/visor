import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaDisenioTecnicoComponent } from './vista-disenio-tecnico.component';
import { MyMaterialModule } from 'src/app/material';
import { ControlActividadModule } from '../control-actividad/control-actividad.module';



@NgModule({
  declarations: [
    VistaDisenioTecnicoComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ControlActividadModule
  ],
  exports: [
    VistaDisenioTecnicoComponent
  ],
  providers: [],
  bootstrap: [VistaDisenioTecnicoComponent]
})
export class VistaDisenioTecnicoModule { }
