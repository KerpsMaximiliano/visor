import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionDocumentosComponent } from './seccion-documentos.component';
import { MyMaterialModule } from '../../material';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalDocumentosComponent } from './modal-documentos/modal-documentos/modal-documentos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalBajaDocumentosComponent } from './modal-baja-documentos/modal-baja-documentos/modal-baja-documentos.component';

@NgModule({
  declarations: [SeccionDocumentosComponent, ModalDocumentosComponent, ModalBajaDocumentosComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [SeccionDocumentosComponent]
})
export class SeccionDocumentosModule { }
