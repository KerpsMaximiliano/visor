import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDesarrolladorComponent } from './vista-desarrollador.component';

describe('VistaDesarrolladorComponent', () => {
  let component: VistaDesarrolladorComponent;
  let fixture: ComponentFixture<VistaDesarrolladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaDesarrolladorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaDesarrolladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
