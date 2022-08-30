import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaDisenioTecnicoComponent } from './componentes/vista-disenio-tecnico/vista-disenio-tecnico.component';

//Componentes


const routes: Routes = [
  { path: 'vista-1', component: VistaDisenioTecnicoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
