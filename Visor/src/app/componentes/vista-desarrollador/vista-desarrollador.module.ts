import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaDesarrolladorComponent } from './vista-desarrollador.component';
import { MyMaterialModule } from 'src/app/material';
import { ControlActividadModule } from '../control-actividad/control-actividad.module';



@NgModule({
  declarations: [ VistaDesarrolladorComponent ],
  imports: [ CommonModule, MyMaterialModule, ControlActividadModule ],
  exports: [ VistaDesarrolladorComponent],
  providers: [],
  bootstrap: [ VistaDesarrolladorComponent ]
})
export class VistaDesarrolladorModule { }
