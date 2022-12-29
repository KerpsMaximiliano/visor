import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/material';
import { FiltroProyectoInputComponent } from './filtro-proyecto-input.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ FiltroProyectoInputComponent ],
    imports: [ CommonModule, MyMaterialModule,FormsModule,MatIconModule ],
    exports: [ FiltroProyectoInputComponent ],
    providers: [],
    bootstrap: [ FiltroProyectoInputComponent ]
  })
  export class FiltroProyectoInputModule { }