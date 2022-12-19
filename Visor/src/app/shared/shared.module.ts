import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material
import { MyMaterialModule } from '../material';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ModalColaboradorComponent } from './modal-colaborador/modal-colaborador.component';



@NgModule({
  declarations: [
  
    ModalColaboradorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  exports: [
  ]
})
export class SharedModule { }