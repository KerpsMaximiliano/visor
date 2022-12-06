import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaProyectManagerComponent } from './vista-proyect-manager.component';
import { MyMaterialModule } from 'src/app/material';
import { ControlActividadModule } from '../control-actividad/control-actividad.module';



@NgModule({
  declarations: [
    VistaProyectManagerComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ControlActividadModule
  ],
  exports: [
    VistaProyectManagerComponent
  ],
  providers: [],
  bootstrap: [
    VistaProyectManagerComponent
  ]
})
export class VistaProyectManagerModule { }
