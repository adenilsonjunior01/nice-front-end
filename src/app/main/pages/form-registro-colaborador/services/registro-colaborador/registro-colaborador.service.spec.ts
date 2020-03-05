import { TestBed } from '@angular/core/testing';

import { RegistroColaboradorService } from './registro-colaborador.service';

describe('RegistroColaboradorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroColaboradorService = TestBed.get(RegistroColaboradorService);
    expect(service).toBeTruthy();
  });
});
