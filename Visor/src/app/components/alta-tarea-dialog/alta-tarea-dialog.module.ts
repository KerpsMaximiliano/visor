import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/material';
import { AltaTareaDialogComponent } from './alta-tarea-dialog.component';
import { FiltroProyectoInputModule } from '../filtro-proyecto-input/filtro-proyecto-input.module';

@NgModule({
    declarations: [ AltaTareaDialogComponent ],
    imports: [ CommonModule, MyMaterialModule,FiltroProyectoInputModule ],
    exports: [ AltaTareaDialogComponent],
    providers: [],
    bootstrap: [ AltaTareaDialogComponent ]
  })
  export class AltaTareaDialogModule { }