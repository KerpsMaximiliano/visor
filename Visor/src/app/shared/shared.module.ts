import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material
import { MyMaterialModule } from '../material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalFiltroDocumentosModule } from './modal-filtro-documentos/modal-filtro-documentos.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMaterialModule,
    MatFormFieldModule,
    ModalFiltroDocumentosModule
  ],
  exports: [
  ]
})
export class SharedModule { }