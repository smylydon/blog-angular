import * as fromFeatures from './features.reducer';
import { selectFeaturesState } from './features.selectors';

describe('Features Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFeaturesState({
      [fromFeatures.featuresFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
