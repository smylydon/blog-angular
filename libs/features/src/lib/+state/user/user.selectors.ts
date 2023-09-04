import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState, usersAdapter } from './user.reducer';
import { UserEntity } from './user.model';

export const selectFeaturesUsersState =
  createFeatureSelector<UserState>(USER_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getUsersLoaded = createSelector(
  selectFeaturesUsersState,
  (state: UserState) => state.loaded
);

export const getUsersError = createSelector(
  selectFeaturesUsersState,
  (state: UserState) => state.error
);

export const getAllUsers = createSelector(
  selectFeaturesUsersState,
  (state: UserState): UserEntity[] => {
    return selectAll(state);
  }
);

export const getUserEntities = createSelector(
  selectFeaturesUsersState,
  (state: UserState) => selectEntities(state)
);

export const getSelectedUserId = createSelector(
  selectFeaturesUsersState,
  (state: UserState) => state.selectedId
);

export const getSelectedUser = createSelector(
  selectFeaturesUsersState,
  getSelectedUserId,
  (entities, selectedId) => (selectedId ? selectedId in entities : undefined)
);
