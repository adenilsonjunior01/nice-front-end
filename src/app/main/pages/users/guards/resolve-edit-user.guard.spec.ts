import { TestBed, async, inject } from '@angular/core/testing';

import { ResolveEditUserGuard } from './resolve-edit-user.guard';

describe('ResolveEditUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveEditUserGuard]
    });
  });

  it('should ...', inject([ResolveEditUserGuard], (guard: ResolveEditUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
