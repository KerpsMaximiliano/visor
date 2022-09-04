import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MyMaterialModule } from './material';

// Componentes
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones-main/configuraciones-main.component';
import { RolesUsuariosModule } from './components/configuraciones/roles-usuarios/roles-usuarios.module';
import { PermisosRolesModule } from './components/configuraciones/permisos-roles/permisos-roles.module';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionesComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RolesUsuariosModule,
    PermisosRolesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
