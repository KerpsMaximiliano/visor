import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionDocumentosComponent } from './seccion-documentos.component';
import { MyMaterialModule } from '../../material';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalDocumentosComponent } from './modal-documentos/modal-documentos/modal-documentos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SeccionDocumentosComponent, ModalDocumentosComponent],
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
