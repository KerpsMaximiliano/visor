import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProyectoInputComponent } from './filtro-proyecto-input.component';

describe('FiltroProyectoInputComponent', () => {
  let component: FiltroProyectoInputComponent;
  let fixture: ComponentFixture<FiltroProyectoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroProyectoInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroProyectoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
