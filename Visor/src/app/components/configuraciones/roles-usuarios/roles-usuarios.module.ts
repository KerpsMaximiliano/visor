import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesUsuariosComponent } from './roles-usuarios.component';
import { MyMaterialModule } from 'src/app/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [ RolesUsuariosComponent ],
  imports: [ CommonModule, MyMaterialModule, MatCheckboxModule, MatMenuModule],
  exports: [ RolesUsuariosComponent ],
  providers: []
})
export class RolesUsuariosModule { }
