import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaDisenioTecnicoComponent } from './vista-disenio-tecnico.component';
import { MyMaterialModule } from 'src/app/material';



@NgModule({
  declarations: [
    VistaDisenioTecnicoComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [
    VistaDisenioTecnicoComponent
  ],
  providers: [],
  bootstrap: [VistaDisenioTecnicoComponent]
})
export class VistaDisenioTecnicoModule { }
