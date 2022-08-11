import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaAnalistaFuncionalComponent } from '../vista-analista-funcional.component';

//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    VistaAnalistaFuncionalComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule
  ],
  exports: [
    VistaAnalistaFuncionalComponent
  ],
  providers: [],
  bootstrap: [VistaAnalistaFuncionalComponent]
})
export class VistaAnalistaModule { }
