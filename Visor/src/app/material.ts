import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


const MATERIALES = [
    MatButtonModule,
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