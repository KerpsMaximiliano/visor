import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDisponibilidadColaboradoresComponent } from './inicio-disponibilidad-colaboradores.component';

describe('InicioDisponibilidadColaboradoresComponent', () => {
  let component: InicioDisponibilidadColaboradoresComponent;
  let fixture: ComponentFixture<InicioDisponibilidadColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioDisponibilidadColaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioDisponibilidadColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
