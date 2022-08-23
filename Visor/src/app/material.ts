import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const MATERIALES = [
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
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