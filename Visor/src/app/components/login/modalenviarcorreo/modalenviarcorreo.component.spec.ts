import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalenviarcorreoComponent } from './modalenviarcorreo.component';

describe('ModalenviarcorreoComponent', () => {
  let component: ModalenviarcorreoComponent;
  let fixture: ComponentFixture<ModalenviarcorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalenviarcorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalenviarcorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
