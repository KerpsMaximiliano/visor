import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './components/tareas/tareas.component';

const routes: Routes = [
  {path:'', redirectTo:'tareas', pathMatch:'full'},
  {path: '**', redirectTo:'tareas', pathMatch:'full'},
  {path: 'tareas', component:TareasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
