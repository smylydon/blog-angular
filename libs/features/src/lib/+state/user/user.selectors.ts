import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState, usersAdapter } from './user.reducer';

export const selectFeaturesState =
  createFeatureSelector<UserState>(USER_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getPostsLoaded = createSelector(
  selectFeaturesState,
  (state: UserState) => state.loaded
);

export const getLabelsError = createSelector(
  selectFeaturesState,
  (state: UserState) => state.error
);

export const getAllPosts = createSelector(
  selectFeaturesState,
  (state: UserState) => {
    return selectAll(state);
  }
);

export const getPostEntities = createSelector(
  selectFeaturesState,
  (state: UserState) => selectEntities(state)
);

export const getSelectedPostId = createSelector(
  selectFeaturesState,
  (state: UserState) => state.selectedId
);

export const getSelectedPost = createSelector(
  selectFeaturesState,
  getSelectedPostId,
  (entities, selectedId) => (selectedId ? selectedId in entities : undefined)
);
