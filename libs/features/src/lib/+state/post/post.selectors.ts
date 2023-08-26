import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POST_FEATURE_KEY, PostState, postsAdapter } from './post.reducer';

export const selectFeaturesState =
  createFeatureSelector<PostState>(POST_FEATURE_KEY);

const { selectAll, selectEntities } = postsAdapter.getSelectors();

export const getPostsLoaded = createSelector(
  selectFeaturesState,
  (state: PostState) => state.loaded
);

export const getLabelsError = createSelector(
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
  selectFeaturesState,
  getSelectedPostId,
  (entities, selectedId) => (selectedId ? selectedId in entities : undefined)
);
