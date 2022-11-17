import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltroDocumentosComponent } from './modal-filtro-documentos.component';

describe('ModalFiltroDocumentosComponent', () => {
  let component: ModalFiltroDocumentosComponent;
  let fixture: ComponentFixture<ModalFiltroDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFiltroDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFiltroDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
