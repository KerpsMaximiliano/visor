import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDisenioTecnicoComponent } from './vista-disenio-tecnico.component';

describe('VistaDisenioTecnicoComponent', () => {
  let component: VistaDisenioTecnicoComponent;
  let fixture: ComponentFixture<VistaDisenioTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaDisenioTecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaDisenioTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
