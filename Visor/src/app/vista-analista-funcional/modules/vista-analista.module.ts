import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaAnalistaFuncionalComponent } from '../vista-analista-funcional.component';

//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    VistaAnalistaFuncionalComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule
  ],
  exports: [
    VistaAnalistaFuncionalComponent
  ],
  providers: [],
  bootstrap: [VistaAnalistaFuncionalComponent]
})
export class VistaAnalistaModule { }
