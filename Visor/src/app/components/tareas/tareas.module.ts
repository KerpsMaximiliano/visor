import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TareasComponent } from './tareas.component';
import { VistaDesarrolladorModule } from 'src/app/componentes/vista-desarrollador/vista-desarrollador.module';
import { VistaDisenioTecnicoModule } from 'src/app/componentes/vista-disenio-tecnico/vista-disenio-tecnico.module';



@NgModule({
  declarations: [TareasComponent],
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTableModule,
    MatAutocompleteModule,
    VistaDesarrolladorModule,
    VistaDisenioTecnicoModule
    
  ],
  exports:[TareasComponent]
})
export class TareasModule { }
