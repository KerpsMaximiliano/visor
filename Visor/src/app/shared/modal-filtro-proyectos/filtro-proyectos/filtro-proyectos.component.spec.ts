import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProyectosComponent } from './filtro-proyectos.component';

describe('FiltroProyectosComponent', () => {
  let component: FiltroProyectosComponent;
  let fixture: ComponentFixture<FiltroProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
