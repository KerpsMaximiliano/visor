import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipoComponent } from './equipo.component';
import { MyMaterialModule } from 'src/app/material';



@NgModule({
  declarations: [
    EquipoComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule
  ]
})
export class EquipoModule { }
