import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEstadoProyectoComponent } from './inicio-estado-proyecto.component';

describe('InicioEstadoProyectoComponent', () => {
  let component: InicioEstadoProyectoComponent;
  let fixture: ComponentFixture<InicioEstadoProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioEstadoProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioEstadoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
