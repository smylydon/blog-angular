import { TestBed } from '@angular/core/testing';

import { FeaturesFacadeService } from '../features-facade.service';

describe('FeaturesFacadeService', () => {
  let service: FeaturesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
