import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionDocumentosComponent } from './seccion-documentos.component';
import { MyMaterialModule } from '../../material';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [SeccionDocumentosComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    NgxPaginationModule
  ],
  exports: [SeccionDocumentosComponent]
})
export class SeccionDocumentosModule { }
