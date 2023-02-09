// * CORE.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// * MAT-TABLE AND VIRTUAL SCROLL.
// * https://diprokon.github.io/ng-table-virtual-scroll/overview
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';

// * MATERIAL.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

// * MATERIAL GLOBAL.
import { MyMaterialModule } from 'src/app/material';

// * COMPONENTS
import { TestEstadoProyectoComponent } from './test-estado-proyecto.component';

@NgModule({
  declarations: [TestEstadoProyectoComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MyMaterialModule,
    ScrollingModule,
    TableVirtualScrollModule,
  ],
  exports: [TestEstadoProyectoComponent],
})
export class TestEstadoModule {}
