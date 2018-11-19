import { TestBed } from '@angular/core/testing';

import { TfidfService } from './tfidf.service';

describe('TfidfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TfidfService = TestBed.get(TfidfService);
    expect(service).toBeTruthy();
  });
});
