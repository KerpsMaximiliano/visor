import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipoComponent } from './equipo.component';
import { MyMaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms'; // necesario para el ngModel



@NgModule({
  declarations: [
    EquipoComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule
  ]
})
export class EquipoModule { }
