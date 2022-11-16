import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionDocumentosComponent } from './seccion-documentos.component';
import { MyMaterialModule } from '../../material';



@NgModule({
  declarations: [SeccionDocumentosComponent],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [SeccionDocumentosComponent]
})
export class SeccionDocumentosModule { }
