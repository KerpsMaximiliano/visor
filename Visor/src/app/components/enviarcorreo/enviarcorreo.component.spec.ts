import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarcorreoComponent } from './enviarcorreo.component';

describe('EnviarcorreoComponent', () => {
  let component: EnviarcorreoComponent;
  let fixture: ComponentFixture<EnviarcorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarcorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarcorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
