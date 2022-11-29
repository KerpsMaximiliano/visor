import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/material';
import { FiltroProyectoInputComponent } from './filtro-proyecto-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ FiltroProyectoInputComponent ],
    imports: [ CommonModule, MyMaterialModule,FormsModule ],
    exports: [ FiltroProyectoInputComponent ],
    providers: [],
    bootstrap: [ FiltroProyectoInputComponent ]
  })
  export class FiltroProyectoInputModule { }