import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarcontraseniaComponent } from './recuperarcontrasenia.component';
import { ModalcontraseniaComponent } from './modalcontrasenia/modalcontrasenia.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [RecuperarcontraseniaComponent, ModalcontraseniaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule
  ],
  exports: [RecuperarcontraseniaComponent]
})
export class RecuperarcontraseniaModule { }
