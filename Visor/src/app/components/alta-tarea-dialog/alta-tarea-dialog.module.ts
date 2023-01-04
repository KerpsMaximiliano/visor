import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AltaTareaDialogComponent } from './alta-tarea-dialog.component';



@NgModule({
  declarations: [AltaTareaDialogComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  exports:[AltaTareaDialogComponent]
})
export class AltaTareaDialogModule { }