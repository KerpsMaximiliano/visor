import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../../material';
import { VistaAnalistaFuncionalComponent } from './vista-analista-funcional.component';



@NgModule({
  declarations: [VistaAnalistaFuncionalComponent],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [VistaAnalistaFuncionalComponent]
})
export class VistaDisenioFuncionalModule { }
