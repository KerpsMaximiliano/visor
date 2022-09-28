import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDisponibilidadColaboradores2Component } from './inicio-disponibilidad-colaboradores2.component';

describe('InicioDisponibilidadColaboradores2Component', () => {
  let component: InicioDisponibilidadColaboradores2Component;
  let fixture: ComponentFixture<InicioDisponibilidadColaboradores2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioDisponibilidadColaboradores2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioDisponibilidadColaboradores2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
