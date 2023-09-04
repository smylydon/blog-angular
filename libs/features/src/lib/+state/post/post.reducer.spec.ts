import { postReducer, initialPostsState } from './post.reducer';

describe('Post Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = postReducer(initialPostsState, action);

      expect(result).toBe(initialPostsState);
    });
  });
});
