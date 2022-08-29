import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Componentes
import { LoginComponent } from './login.component';
import { ModalenviarcorreoComponent } from './modalenviarcorreo/modalenviarcorreo.component';
import { MyMaterialModule } from '../../material';



@NgModule({
  declarations: [LoginComponent, ModalenviarcorreoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
