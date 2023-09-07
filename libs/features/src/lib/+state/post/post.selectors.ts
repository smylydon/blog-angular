import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POST_FEATURE_KEY, PostState, postsAdapter } from './post.reducer';

export const selectFeaturesPostsState =
  createFeatureSelector<PostState>(POST_FEATURE_KEY);

const { selectEntities, selectAll } = postsAdapter.getSelectors();

export const getPostsLoaded = createSelector(
  selectFeaturesPostsState,
  (state: PostState) => state.loaded
);

export const getPostsError = createSelector(
  selectFeaturesPostsState,
  (state: PostState) => state.error
);

export const getAllPosts = createSelector(
  selectFeaturesPostsState,
  (state: PostState) => {
    return selectAll(state);
  }
);

export const getPostEntities = createSelector(
  selectFeaturesPostsState,
  (state: PostState) => selectEntities(state)
);

export const getSelectedPostId = createSelector(
  selectFeaturesPostsState,
  (state: PostState) => state.selectedId
);

export const getSelectedPost = createSelector(
  getPostEntities,
  getSelectedPostId,
  (postEntities, id) => id && postEntities[id]
);
