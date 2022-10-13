import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroProyectosComponent } from './filtro-proyectos.component';
import { MyMaterialModule } from '../../../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [FiltroProyectosComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [FiltroProyectosComponent]
})
export class FiltroModule { }
