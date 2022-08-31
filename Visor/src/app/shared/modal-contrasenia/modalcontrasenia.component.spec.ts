import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcontraseniaComponent } from './modalcontrasenia.component';

describe('ModalcontraseniaComponent', () => {
  let component: ModalcontraseniaComponent;
  let fixture: ComponentFixture<ModalcontraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalcontraseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcontraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
