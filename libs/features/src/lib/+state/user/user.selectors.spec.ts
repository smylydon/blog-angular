import * as fromFeatures from './user.reducer';
import { selectFeaturesUsersState } from './user.selectors';

describe('User Selectors', () => {
  it('should select the post state', () => {
    const result = selectFeaturesUsersState({
      [fromFeatures.USER_FEATURE_KEY]: {},
    });

    expect(result).toEqual({});
  });
});
