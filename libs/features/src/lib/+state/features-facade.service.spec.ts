import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FeaturesFacadeService } from './features-facade.service';

describe('FeaturesFacadeService', () => {
  let service: FeaturesFacadeService;
  let store: MockStore<any>;
  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturesFacadeService, provideMockStore({ initialState })],
    });

    service = TestBed.inject(FeaturesFacadeService);
    //store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
