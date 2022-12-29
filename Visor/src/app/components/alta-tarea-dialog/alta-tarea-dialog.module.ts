import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/material';
import { AltaTareaDialogComponent } from './alta-tarea-dialog.component';
import { FiltroProyectoInputModule } from '../filtro-proyecto-input/filtro-proyecto-input.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ AltaTareaDialogComponent ],
    imports: [ CommonModule, MyMaterialModule, FiltroProyectoInputModule, MatIconModule ],
    exports: [ AltaTareaDialogComponent],
    providers: [],
    bootstrap: [ AltaTareaDialogComponent ]
  })
  export class AltaTareaDialogModule { }