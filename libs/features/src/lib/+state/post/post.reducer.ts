import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostActions } from './post.actions';
import { Post } from './post.model';

export const POST_FEATURE_KEY = 'posts';

export interface PostState extends EntityState<Post> {
  selectedId?: string | number; // which Labels record has been selected
  loaded: boolean;
  error?: Error | null; // last known error (if any)
}

export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (model: Post) => model.id,
});

export const initialPostsState: PostState = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  error: null,
});

const setState = (
  state: PostState,
  loaded: boolean,
  error: Error | null = null
) => {
  return <PostState>{ ...state, loaded, error };
};

export const postReducer = createReducer(
  initialPostsState,
  on(PostActions.getPosts, (state) => setState(state, true, null)),
  on(PostActions.loadPosts, (state) => setState(state, false, null)),
  on(PostActions.loadPostsSuccess, (state, { posts }) => {
    return postsAdapter.setAll(posts, setState(state, true, null));
  }),
  on(PostActions.loadPostsFailure, (state, { error }) =>
    setState(state, true, error)
  ),
  on(PostActions.savePostSuccess, (state, { post }) => {
    return postsAdapter.addOne(post, setState(state, true, null));
  }),
  on(PostActions.savePostFailure, (state, { error }) =>
    setState(state, true, error)
  ),

  on(PostActions.updatePostSuccess, (state, { update }) => {
    return postsAdapter.updateOne(update, setState(state, true));
  }),
  on(PostActions.updatePostFailure, (state, { error }) =>
    setState(state, true, error)
  ),
  on(PostActions.updateReaction, (state, { update }) => {
    return postsAdapter.updateOne(update, setState(state, true));
  }),
  on(PostActions.deletePostSuccess, (state, { post_id }) => {
    return postsAdapter.removeOne(post_id, setState(state, true, null));
  }),
  on(PostActions.deletePostFailure, (state, { error }) =>
    setState(state, true, error)
  )
);

export function getPostReducer(state: PostState | undefined, action: Action) {
  return postReducer(state, action);
}
