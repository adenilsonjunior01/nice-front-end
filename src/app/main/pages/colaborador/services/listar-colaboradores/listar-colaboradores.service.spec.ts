import { TestBed } from '@angular/core/testing';

import { ListarColaboradoresService } from './listar-colaboradores.service';

describe('ListarColaboradoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListarColaboradoresService = TestBed.get(ListarColaboradoresService);
    expect(service).toBeTruthy();
  });
});
