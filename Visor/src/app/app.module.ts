import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MyMaterialModule } from './material';

// Componentes
import { ConfiguracionesComponent } from './componentes/configuraciones/configuraciones.component';
import { PermisosRolesComponent } from './componentes/permisos-roles/permisos-roles.component';
import { RolesUsuariosModule } from './componentes/roles-usuarios/roles-usuarios.module';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionesComponent,
    PermisosRolesComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RolesUsuariosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
