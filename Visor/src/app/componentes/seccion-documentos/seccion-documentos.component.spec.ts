import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionDocumentosComponent } from './seccion-documentos.component';

describe('SeccionDocumentosComponent', () => {
  let component: SeccionDocumentosComponent;
  let fixture: ComponentFixture<SeccionDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
