import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadComponent } from  '../control-actividad/actividad/actividad.component';
import { MyMaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { ModalActividadComponent } from './modal-actividad/modal-actividad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';




@NgModule({
  declarations: [
    ActividadComponent,
    ModalActividadComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[ActividadComponent,ModalActividadComponent],
  providers:[ModalActividadComponent]
})
export class ControlActividadModule { }
