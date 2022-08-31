import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarcontraseniaComponent } from './recuperarcontrasenia.component';
import { ModalcontraseniaComponent } from './modalcontrasenia/modalcontrasenia.component';
import { MyMaterialModule } from '../../material';

@NgModule({
  declarations: [RecuperarcontraseniaComponent, ModalcontraseniaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  exports: [RecuperarcontraseniaComponent]
})
export class RecuperarcontraseniaModule { }
