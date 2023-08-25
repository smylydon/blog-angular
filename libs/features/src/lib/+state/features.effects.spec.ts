import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FeaturesEffects } from './features.effects';

describe('FeaturesEffects', () => {
  let actions$: Observable<any>;
  let effects: FeaturesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(FeaturesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
