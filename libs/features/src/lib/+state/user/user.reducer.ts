import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserActions } from './user.actions';
import { UserEntity } from './user.model';

export const USER_FEATURE_KEY = 'users';

export interface UserState extends EntityState<UserEntity> {
  selectedId?: string | number; // which Labels record has been selected
  status: string; //'idle' | 'loading' | 'succeeded' | 'failed'
  loaded: boolean;
  error?: Error | null; // last known error (if any)
}

export const usersAdapter: EntityAdapter<UserEntity> =
  createEntityAdapter<UserEntity>({
    selectId: (model: UserEntity) => model.id,
  });

export const initialUsersState: UserState = usersAdapter.getInitialState({
  // set initial required properties
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  loaded: false,
});

export const reducer = createReducer(
  initialUsersState,
  on(UserActions.intializeUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return usersAdapter.setAll(users, { ...state, loaded: true });
  }),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
