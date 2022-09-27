import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarcontraseniaComponent } from './componentes/recuperar-contrasenia/recuperar-contrasenia.component';
import { InicioMainComponent } from './componentes/inicio/inicio-main/inicio-main.component';
import { InicioDisponibilidadColaboradoresComponent } from './componentes/inicio/inicio-disponibilidad-colaboradores/inicio-disponibilidad-colaboradores.component';

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
  { path: 'inicio-main', component: InicioMainComponent,
    children: [
      { path: 'inicio-colaboradores', component: InicioDisponibilidadColaboradoresComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
