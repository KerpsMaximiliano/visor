import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTesterComponent } from './vista-tester.component';

describe('VistaTesterComponent', () => {
  let component: VistaTesterComponent;
  let fixture: ComponentFixture<VistaTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
