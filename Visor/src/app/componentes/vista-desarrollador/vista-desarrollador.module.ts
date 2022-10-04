import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaDesarrolladorComponent } from './vista-desarrollador.component';
import { MyMaterialModule } from 'src/app/material';



@NgModule({
  declarations: [ VistaDesarrolladorComponent ],
  imports: [ CommonModule, MyMaterialModule ],
  exports: [ VistaDesarrolladorComponent],
  providers: [],
  bootstrap: [ VistaDesarrolladorComponent ]
})
export class VistaDesarrolladorModule { }
