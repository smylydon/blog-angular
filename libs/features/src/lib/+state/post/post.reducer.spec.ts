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

  describe('an loadUsersFailure action', () => {
    it('should return the previous state', () => {
      const error: Error = new Error('Test Error');

      const action = PostActions.loadPostsFailure({
        error,
      });

      const result = postReducer(initialPostsState, action);

      expect(result.loaded).toBe(true);
      expect(result.error).not.toBeNull();
      expect(result.error).toEqual(error);
    });
  });

  describe('an updateReaction action', () => {
    it('should return the previous state', () => {
      const action = PostActions.loadPostsSuccess({
        posts: postsList,
      });

      const stateOne = postReducer(initialPostsState, action);
      const posts = Object.values(stateOne.entities);

      const post = posts[0];
      const post_id = post?.id;
      const reactions = Object.assign(
        {},
        {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
        {
          ...post?.reactions,
        }
      );
      reactions['thumbsUp'] = (post?.reactions['thumbsUp'] ?? 0) + 1;

      const action2 = PostActions.updateReaction({
        update: {
          id: post?.id ?? 0,
          changes: {
            reactions,
          },
        },
      });

      const stateTwo = postReducer(stateOne, action2);
      const posts2: Post[] = <Post[]>Object.values(stateTwo.entities);
      const testPost: Post | undefined = posts2.find(
        (aPost: Post) => aPost.id === post_id
      );
      const testThumbsUp = testPost?.reactions?.thumbsUp ?? 0;

      expect(posts2.length).toEqual(postsList.length);
      expect(posts2).not.toEqual(postsList);
      expect(testPost).toBeDefined();
      expect(testThumbsUp).toEqual(1);
      expect(stateTwo.loaded).toBe(true);
      expect(stateTwo.error).toBeNull();
    });
  });
});
