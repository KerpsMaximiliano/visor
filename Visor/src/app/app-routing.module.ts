import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarcontraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';
import { VistaDisenioTecnicoComponent } from './componentes/vista-disenio-tecnico/vista-disenio-tecnico.component';

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
    path: "recuperar-contraseña",
    component: RecuperarcontraseniaComponent
  },
  {
    path: "vista-diseño-tecnico",
    component: VistaDisenioTecnicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
