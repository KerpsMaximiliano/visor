import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaTesterComponent } from './vista-tester.component';
import { MyMaterialModule } from 'src/app/material';
import { ControlActividadModule } from '../control-actividad/control-actividad.module';



@NgModule({
  declarations: [
    VistaTesterComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ControlActividadModule
  ],
  exports: [
    VistaTesterComponent
  ],
  providers: [],
  bootstrap: [VistaTesterComponent]
})
export class VistaTesterModule { }
