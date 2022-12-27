import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBajaDocumentosComponent } from './modal-baja-documentos.component';

describe('ModalBajaDocumentosComponent', () => {
  let component: ModalBajaDocumentosComponent;
  let fixture: ComponentFixture<ModalBajaDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBajaDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBajaDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
