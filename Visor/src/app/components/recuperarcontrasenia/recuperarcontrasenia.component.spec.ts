import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarcontraseniaComponent } from './recuperarcontrasenia.component';

describe('RecuperarcontraseniaComponent', () => {
  let component: RecuperarcontraseniaComponent;
  let fixture: ComponentFixture<RecuperarcontraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarcontraseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarcontraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
