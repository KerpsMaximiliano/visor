import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const MATERIALES = [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
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