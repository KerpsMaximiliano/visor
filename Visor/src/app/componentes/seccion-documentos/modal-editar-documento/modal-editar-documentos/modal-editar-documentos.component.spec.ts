import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarDocumentosComponent } from './modal-editar-documentos.component';

describe('ModalEditarDocumentosComponent', () => {
  let component: ModalEditarDocumentosComponent;
  let fixture: ComponentFixture<ModalEditarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
