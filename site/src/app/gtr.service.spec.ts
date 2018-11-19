import { TestBed } from '@angular/core/testing';

import { GtrService } from './gtr.service';

describe('GtrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtrService = TestBed.get(GtrService);
    expect(service).toBeTruthy();
  });
});
