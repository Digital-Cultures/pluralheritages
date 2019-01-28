import { TestBed } from '@angular/core/testing';

import { MapDataTrService } from './map-data-tr.service';

describe('MapDataTrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapDataTrService = TestBed.get(MapDataTrService);
    expect(service).toBeTruthy();
  });
});
