import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState, usersAdapter } from './user.reducer';
import { UserEntity } from './user.model';

export const selectFeaturesState =
  createFeatureSelector<UserState>(USER_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getUsersLoaded = createSelector(
  selectFeaturesState,
  (state: UserState) => state.loaded
);

export const getUsersError = createSelector(
  selectFeaturesState,
  (state: UserState) => state.error
);

export const getAllUsers = createSelector(
  selectFeaturesState,
  (state: UserState): UserEntity[] => {
    return selectAll(state);
  }
);

export const getUserEntities = createSelector(
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
