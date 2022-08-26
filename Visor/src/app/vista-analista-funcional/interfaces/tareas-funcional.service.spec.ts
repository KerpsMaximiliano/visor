import { TestBed } from '@angular/core/testing';

import { TareasFuncionalService } from './tareas-funcional.service';

describe('TareasFuncionalService', () => {
  let service: TareasFuncionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasFuncionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
