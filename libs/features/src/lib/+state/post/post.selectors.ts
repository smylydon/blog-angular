import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POST_FEATURE_KEY, PostState, postsAdapter } from './post.reducer';

export const selectFeaturesState =
  createFeatureSelector<PostState>(POST_FEATURE_KEY);

const { selectIds, selectEntities, selectAll, selectTotal } =
  postsAdapter.getSelectors();

export const getPostsLoaded = createSelector(
  selectFeaturesState,
  (state: PostState) => state.loaded
);

export const getPostsError = createSelector(
  selectFeaturesState,
  (state: PostState) => state.error
);

export const getAllPosts = createSelector(
  selectFeaturesState,
  (state: PostState) => {
    return selectAll(state);
  }
);

export const getPostEntities = createSelector(
  selectFeaturesState,
  (state: PostState) => selectEntities(state)
);

export const getSelectedPostId = createSelector(
  selectFeaturesState,
  (state: PostState) => state.selectedId
);

export const getSelectedPost = createSelector(
  getPostEntities,
  getSelectedPostId,
  (postEntities, id) => id && postEntities[id]
);
