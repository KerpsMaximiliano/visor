import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTareaDialogComponent } from './alta-tarea-dialog.component';

describe('AltaTareaDialogComponent', () => {
  let component: AltaTareaDialogComponent;
  let fixture: ComponentFixture<AltaTareaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTareaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTareaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
