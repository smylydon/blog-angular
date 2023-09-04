import * as fromFeatures from './post.reducer';
import { selectFeaturesPostsState } from './post.selectors';

describe('Post Selectors', () => {
  it('should select the post state', () => {
    const result = selectFeaturesPostsState({
      [fromFeatures.POST_FEATURE_KEY]: {},
    });

    expect(result).toEqual({});
  });
});
