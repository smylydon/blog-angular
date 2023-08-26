import { reducer, initialPostsState } from './post.reducer';

describe('Post Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialPostsState, action);

      expect(result).toBe(initialPostsState);
    });
  });
});
