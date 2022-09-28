import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosRolesComponent } from './permisos-roles.component';
import { MyMaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ PermisosRolesComponent ],
  imports: [ CommonModule, MyMaterialModule, FormsModule ],
  exports: [ PermisosRolesComponent ],
  providers: []
})
export class PermisosRolesModule { }
