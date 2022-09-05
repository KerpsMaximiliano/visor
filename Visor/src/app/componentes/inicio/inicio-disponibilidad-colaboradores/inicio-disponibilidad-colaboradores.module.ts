import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioDisponibilidadColaboradoresComponent } from './inicio-disponibilidad-colaboradores.component';
import { MyMaterialModule } from 'src/app/material';



@NgModule({
  declarations: [ InicioDisponibilidadColaboradoresComponent ],
  imports: [ CommonModule, MyMaterialModule ],
    exports: [ InicioDisponibilidadColaboradoresComponent ],
    providers: []
})
export class InicioDisponibilidadColaboradoresModule { }
