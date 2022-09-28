import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioDisponibilidadColaboradores2Component } from './inicio-disponibilidad-colaboradores2.component';
import { MyMaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ InicioDisponibilidadColaboradores2Component ],
  imports: [ CommonModule, MyMaterialModule, FormsModule ],
    exports: [ InicioDisponibilidadColaboradores2Component ],
    providers: []
})
export class InicioDisponibilidadColaboradores2Module { }