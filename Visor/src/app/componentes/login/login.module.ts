import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Componentes
import { LoginComponent } from './login.component';
import { MyMaterialModule } from '../../material';
import { ModalenviarcorreoComponent } from '../../shared/modal-enviar-correo/modal-enviar-correo.component';



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
