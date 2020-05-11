import { TestBed } from '@angular/core/testing';

import { EditarEmpresaService } from './editar-empresa.service';

describe('EditarEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditarEmpresaService = TestBed.get(EditarEmpresaService);
    expect(service).toBeTruthy();
  });
});
