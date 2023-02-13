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
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectStatusComponent } from './components/project-status/project-status.component';
import { ProjectAreasComponent } from './components/project-areas/project-areas.component';

// * PIPES
import { LateTasksPipe, OnTimeTasksPipe } from './pipes/project-tasks.pipe';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectStatusComponent,
    ProjectAreasComponent,
    LateTasksPipe,
    OnTimeTasksPipe,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MyMaterialModule,
    ScrollingModule,
    TableVirtualScrollModule,
  ],
  exports: [ProjectsComponent],
})
export class EstadoProyectoModule {}
