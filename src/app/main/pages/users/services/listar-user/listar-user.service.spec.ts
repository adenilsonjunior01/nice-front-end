import { TestBed } from '@angular/core/testing';

import { ListarUserService } from './listar-user.service';

describe('ListarUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListarUserService = TestBed.get(ListarUserService);
    expect(service).toBeTruthy();
  });
});
