import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadComponent } from  '../control-actividad/actividad/actividad.component';
//import { MyMaterialModule } from '../materia';
//import { SharedModule } from '../shared/shared.module';
import { ModalActividadComponent } from './modal-actividad/modal-actividad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/i2t/dialog.service'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyMaterialModule } from 'src/app/material';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    ActividadComponent,
    ModalActividadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MyMaterialModule,
    ScrollingModule
  ],
  /*imports: [
    CommonModule,
    MyMaterialModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],*/
  entryComponents:[ModalActividadComponent,ActividadComponent],
  exports:[ActividadComponent,ModalActividadComponent],
  providers:[ModalActividadComponent,ActividadComponent,{provide:MatDialogRef,useValue:{}},{ provide: MAT_DIALOG_DATA, useValue: {} },DialogService]
})
export class ControlActividadModule { }
