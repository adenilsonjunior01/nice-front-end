import { TestBed } from '@angular/core/testing';

import { ListarEmpresaService } from './listar-empresa.service';

describe('ListarEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListarEmpresaService = TestBed.get(ListarEmpresaService);
    expect(service).toBeTruthy();
  });
});
