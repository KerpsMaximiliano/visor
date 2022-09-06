import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioDisponibilidadColaboradoresComponent } from './inicio-disponibilidad-colaboradores.component';
import { MyMaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ InicioDisponibilidadColaboradoresComponent ],
  imports: [ CommonModule, MyMaterialModule, FormsModule ],
    exports: [ InicioDisponibilidadColaboradoresComponent ],
    providers: []
})
export class InicioDisponibilidadColaboradoresModule { }
