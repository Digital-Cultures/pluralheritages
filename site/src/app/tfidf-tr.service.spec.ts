import { TestBed } from '@angular/core/testing';

import { TfidfTrService } from './tfidf-tr.service';

describe('TfidfTrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TfidfTrService = TestBed.get(TfidfTrService);
    expect(service).toBeTruthy();
  });
});
