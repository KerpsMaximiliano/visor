import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarcontraseniaComponent } from './recuperar-contrasenia.component';
import { MyMaterialModule } from '../../material';

@NgModule({
  declarations: [RecuperarcontraseniaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  exports: [RecuperarcontraseniaComponent]
})
export class RecuperarcontraseniaModule { }
