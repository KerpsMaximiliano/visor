import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProyectosComponent } from './inicio-proyectos.component';

describe('InicioProyectosComponent', () => {
  let component: InicioProyectosComponent;
  let fixture: ComponentFixture<InicioProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
