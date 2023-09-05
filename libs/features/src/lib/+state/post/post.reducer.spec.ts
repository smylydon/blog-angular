import { postReducer, initialPostsState } from './post.reducer';
import { Post } from './post.model';
import { PostActions } from './post.actions';
import { posts as PostsArray } from './../../mocks';
import { HelperService } from '../../services/index';

describe('Post Reducer', () => {
  const helper = new HelperService();
  const postsList: Post[] = helper.convertPostEntityToPost(PostsArray);

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = postReducer(initialPostsState, action);

      expect(result).toBe(initialPostsState);
      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('an getPosts action', () => {
    it('should return the previous state', () => {
      const action = PostActions.getPosts();

      const result = postReducer(initialPostsState, action);

      expect(result.entities).toEqual({});
      expect(result.loaded).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('an loadPosts action', () => {
    it('should return the previous state', () => {
      const action = PostActions.loadPosts();

      const result = postReducer(initialPostsState, action);

      expect(result.entities).toEqual({});
      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('an loadPostsSuccess action', () => {
    it('should return the previous state', () => {
      const action = PostActions.loadPostsSuccess({
        posts: postsList,
      });

      const result = postReducer(initialPostsState, action);
      const posts = Object.values(result.entities);

      expect(posts.length).toEqual(postsList.length);
      expect(posts).toEqual(postsList);
      expect(result.loaded).toBe(true);
      expect(result.error).toBeNull();
    });
  });
});
