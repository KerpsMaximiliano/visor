import { TestBed } from '@angular/core/testing';

import { UploadArchivoService } from './upload-archivo.service';

describe('UploadArchivoService', () => {
  let service: UploadArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
