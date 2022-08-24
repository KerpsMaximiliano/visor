import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { EnviarcorreoComponent } from './components/enviarcorreo/enviarcorreo.component';
import { RecuperarcontraseniaComponent } from './components/recuperarcontrasenia/recuperarcontrasenia.component';
import { ModalcontraseniaComponent } from './components/recuperarcontrasenia/modalcontrasenia/modalcontrasenia.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "enviar-correo",
    component: EnviarcorreoComponent
  },
  {
    path: "recuperar-contraseña",
    component: RecuperarcontraseniaComponent
  },
  {
    path: "prueba",
    component: ModalcontraseniaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
