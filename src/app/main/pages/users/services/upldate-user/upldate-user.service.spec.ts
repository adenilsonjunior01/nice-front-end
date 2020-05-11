import { TestBed } from '@angular/core/testing';

import { UpldateUserService } from './upldate-user.service';

describe('UpldateUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpldateUserService = TestBed.get(UpldateUserService);
    expect(service).toBeTruthy();
  });
});
