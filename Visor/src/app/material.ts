import { MatButtonModule } from '@angular/material/button';


const MATERIALES = [
    MatButtonModule,
    
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