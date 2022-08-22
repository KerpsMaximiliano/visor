import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';


const MATERIALES = [
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatTableModule
]


import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MATERIALES
  ],
  exports: [
      MATERIALES
  ],
})

export class MyMaterialModule {}