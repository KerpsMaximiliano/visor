import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';



const MATERIALES = [
  MatButtonModule,
  MatSliderModule,
  MatIconModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatTooltipModule,
  MatDialogModule,
  MatCheckboxModule,
  MatListModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatSelectModule
]

import { NgModule } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  imports: [
    MATERIALES
  ],
  exports: [
      MATERIALES
  ],
})

export class MyMaterialModule {}
