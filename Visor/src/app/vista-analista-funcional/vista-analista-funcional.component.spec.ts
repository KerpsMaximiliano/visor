import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAnalistaFuncionalComponent } from './vista-analista-funcional.component';

describe('VistaAnalistaFuncionalComponent', () => {
  let component: VistaAnalistaFuncionalComponent;
  let fixture: ComponentFixture<VistaAnalistaFuncionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaAnalistaFuncionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAnalistaFuncionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
