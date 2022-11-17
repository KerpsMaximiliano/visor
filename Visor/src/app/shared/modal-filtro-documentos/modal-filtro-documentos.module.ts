import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFiltroDocumentosComponent } from './modal-filtro-documentos.component';
import { MyMaterialModule } from '../../material';
import { Document } from './Class/document';


@NgModule({
  declarations: [ModalFiltroDocumentosComponent],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [ModalFiltroDocumentosComponent],
  providers: [Document]
})
export class ModalFiltroDocumentosModule { }
