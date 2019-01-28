import { TestBed } from '@angular/core/testing';

import { VideoTrService } from './video-tr.service';

describe('VideoTrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoTrService = TestBed.get(VideoTrService);
    expect(service).toBeTruthy();
  });
});
