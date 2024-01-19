import { Dictionary } from '@ngrx/entity';
import { PostState } from './post.reducer';
import { Post } from './post.model';
import * as fromFeatures from './post.reducer';
import {
  getPostsLoaded,
  getPostEntities,
  getAllPosts,
  selectFeaturesPostsState,
} from './post.selectors';
import { posts as PostsArray } from './../../mocks';
import { HelperService } from '../../services/index';

describe('Post Selectors', () => {
  const helper = new HelperService();
  const postsList: Post[] = helper.convertPostEntityToPost(PostsArray);
  const ids: number[] = postsList.map((post: Post) => post.id);
  const entities: Dictionary<Post> = {};
  const initialState: PostState = {
    entities,
    ids,
    loaded: false,
    error: null,
  };
  postsList.forEach((post: Post) => {
    entities[post.id] = post;
  });

  it('should select the post state', () => {
    const result = selectFeaturesPostsState({
      [fromFeatures.POST_FEATURE_KEY]: {},
    });

    expect(result).toEqual({});
  });

  describe('Posts slice', () => {
    let state: PostState;
    beforeEach(() => {
      state = selectFeaturesPostsState({
        [fromFeatures.POST_FEATURE_KEY]: {
          posts: initialState,
        },
      });
    });

    it('should return all posts', () => {
      const posts = getAllPosts(state);
      expect(posts).toEqual(postsList);
      expect(posts[0]).toEqual(postsList[0]);
    });

    it('should return loaded property', () => {
      const loaded = getPostsLoaded(state);
      expect(loaded).toEqual(false);
    });

    // it('should return loaded property', () => {
    //   const loaded = getPostsError(state);
    //   expect(loaded).toEqual(false);
    // });

    it('should return all entities', () => {
      const currentEntities = getPostEntities(state);
      expect(currentEntities).toEqual(entities);
    });
  });
});
