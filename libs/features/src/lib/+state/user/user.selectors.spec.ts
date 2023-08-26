import * as fromFeatures from './user.reducer';
import { selectFeaturesState } from './user.selectors';

describe('User Selectors', () => {
  it('should select the post state', () => {
    const result = selectFeaturesState({
      [fromFeatures.USER_FEATURE_KEY]: {},
    });

    expect(result).toEqual({});
  });
});
