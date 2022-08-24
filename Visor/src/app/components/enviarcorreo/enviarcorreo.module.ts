import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Componentes
import { EnviarcorreoComponent } from './enviarcorreo.component';



@NgModule({
  declarations: [EnviarcorreoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EnviarcorreoComponent]
})
export class EnviarcorreoModule { }
