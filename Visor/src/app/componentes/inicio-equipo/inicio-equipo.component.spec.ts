import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEquipoComponent } from './inicio-equipo.component';

describe('InicioEquiposComponent', () => {
  let component: InicioEquipoComponent;
  let fixture: ComponentFixture<InicioEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
