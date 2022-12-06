import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaProyectManagerComponent } from './vista-proyect-manager.component';

describe('VistaProyectManagerComponent', () => {
  let component: VistaProyectManagerComponent;
  let fixture: ComponentFixture<VistaProyectManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaProyectManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaProyectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
