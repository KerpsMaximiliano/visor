import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadComponent } from './actividad/actividad.component';
import { MyMaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    ActividadComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    SharedModule
  ],
  exports:[ActividadComponent]
})
export class ControlActividadModule { }
