import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserActions } from './user.actions';
import { UserEntity } from './user.model';

export const USER_FEATURE_KEY = 'users';

export interface UserState extends EntityState<UserEntity> {
  selectedId?: string | number; // which Labels record has been selected
  loaded: boolean;
  error?: Error | null; // last known error (if any)
}

export const usersAdapter: EntityAdapter<UserEntity> =
  createEntityAdapter<UserEntity>({
    selectId: (model: UserEntity) => model.id,
  });

export const initialUsersState: UserState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  error: null,
});

const setState = (
  state: UserState,
  loaded: boolean,
  error: Error | null = null
) => {
  return <UserState>{ ...state, loaded, error };
};

export const userReducer = createReducer(
  initialUsersState,
  on(UserActions.getUsers, (state) => setState(state, true)),
  on(UserActions.loadUsers, (state) => setState(state, false)),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return usersAdapter.setAll(users, setState(state, true));
  }),
  on(UserActions.loadUsersFailure, (state, { error }) =>
    setState(state, true, error)
  )
);

export function getUserReducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
