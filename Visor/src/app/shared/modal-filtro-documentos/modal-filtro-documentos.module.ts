import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFiltroDocumentosComponent } from './modal-filtro-documentos.component';
import { MyMaterialModule } from '../../material';
import { Document } from './Class/document';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [ModalFiltroDocumentosComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule,
    MatDatepickerModule
  ],
  exports: [ModalFiltroDocumentosComponent],
  providers: [Document]
})
export class ModalFiltroDocumentosModule { }
