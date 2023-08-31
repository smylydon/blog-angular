import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostActions } from './post.actions';
import { Post } from './post.model';

export const POST_FEATURE_KEY = 'posts';

export interface PostState extends EntityState<Post> {
  selectedId?: string | number; // which Labels record has been selected
  status: string; //'idle' | 'loading' | 'succeeded' | 'failed'
  loaded: boolean;
  error?: Error | null; // last known error (if any)
}

export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (model: Post) => model.id,
});

export const initialPostsState: PostState = postsAdapter.getInitialState({
  // set initial required properties
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  loaded: false,
});

export const reducer = createReducer(
  initialPostsState,
  on(PostActions.intializePosts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PostActions.loadPosts, (state) => ({
    ...state,
    loaded: true,
    error: null,
  })),
  on(PostActions.loadPostsSuccess, (state, { posts }) => {
    return postsAdapter.setAll(posts, { ...state, loaded: true });
  }),
  on(PostActions.updatePost, (state, { update }) => {
    return postsAdapter.updateOne(update, state);
  })
);

export function postReducer(state: PostState | undefined, action: Action) {
  return reducer(state, action);
}
