import * as fromFeatures from './post.reducer';
import { selectFeaturesState } from './post.selectors';

describe('Post Selectors', () => {
  it('should select the post state', () => {
    const result = selectFeaturesState({
      [fromFeatures.POST_FEATURE_KEY]: {},
    });

    expect(result).toEqual({});
  });
});
