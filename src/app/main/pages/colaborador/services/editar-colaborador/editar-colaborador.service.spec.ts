import { TestBed } from '@angular/core/testing';

import { EditarColaboradorService } from './editar-colaborador.service';

describe('EditarColaboradorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditarColaboradorService = TestBed.get(EditarColaboradorService);
    expect(service).toBeTruthy();
  });
});
