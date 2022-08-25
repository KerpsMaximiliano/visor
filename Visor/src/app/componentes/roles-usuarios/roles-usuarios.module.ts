import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesUsuariosComponent } from './roles-usuarios.component';
import { MyMaterialModule } from 'src/app/material';



@NgModule({
  declarations: [
    RolesUsuariosComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [
    RolesUsuariosComponent
  ],
  providers: []
})
export class RolesUsuariosModule { }
