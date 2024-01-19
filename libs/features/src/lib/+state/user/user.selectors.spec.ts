import { Dictionary } from '@ngrx/entity';
import { UserState } from './user.reducer';
import { UserEntity } from './user.model';
import * as fromFeatures from './user.reducer';
import {
  getUsersLoaded,
  getAllUsers,
  getUserEntities,
  selectFeaturesUsersState,
} from './user.selectors';
import { users as UsersArray } from './../../mocks';

describe('User Selectors', () => {
  const ids: number[] = UsersArray.map((user: UserEntity) => user.id);
  const entities: Dictionary<UserEntity> = {};
  const initialState: UserState = {
    entities,
    ids,
    loaded: false,
    error: null,
  };
  UsersArray.forEach((user: UserEntity) => {
    entities[user.id] = user;
  });
  it('should select the user state', () => {
    const result = selectFeaturesUsersState({
      [fromFeatures.USER_FEATURE_KEY]: {},
    });

    expect(result).toEqual({});
  });

  describe('Users slice', () => {
    let state: UserState;
    beforeEach(() => {
      state = selectFeaturesUsersState({
        [fromFeatures.USER_FEATURE_KEY]: {
          users: initialState,
        },
      });
    });

    it('should return all users', () => {
      const users = getAllUsers(state);
      expect(users).toEqual(UsersArray);
      expect(users[0]).toEqual(UsersArray[0]);
    });

    it('should return loaded property', () => {
      const loaded = getUsersLoaded(state);
      expect(loaded).toEqual(false);
    });

    it('should return all entities', () => {
      const currentEntities = getUserEntities(state);
      expect(currentEntities).toEqual(entities);
    });
  });
});
