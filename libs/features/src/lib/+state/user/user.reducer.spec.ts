import { userReducer, initialUsersState } from './user.reducer';
import { UserActions } from './user.actions';
import { users as UsersArray } from '../../mocks';
import { Action } from '@ngrx/store';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = userReducer(initialUsersState, action);

      expect(result).toBe(initialUsersState);
      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('an getUsers action', () => {
    it('should return the previous state', () => {
      const action = UserActions.getUsers();

      const result = userReducer(initialUsersState, action);

      expect(result.entities).toEqual({});
      expect(result.loaded).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('an loadUsers action', () => {
    it('should return the previous state', () => {
      const action = UserActions.loadUsers();

      const result = userReducer(initialUsersState, action);

      expect(result.entities).toEqual({});
      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('an loadUsersSuccess action', () => {
    it('should return the previous state', () => {
      const action = UserActions.loadUsersSuccess({
        users: UsersArray,
      });

      const result = userReducer(initialUsersState, action);
      const users = Object.values(result.entities);

      expect(users.length).toEqual(UsersArray.length);
      expect(users).toEqual(UsersArray);
      expect(result.loaded).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('an loadUsersFailure action', () => {
    it('should return the previous state', () => {
      const error: Error = new Error('Test Error');

      const action = UserActions.loadUsersFailure({
        error,
      });

      const result = userReducer(initialUsersState, action);

      expect(result.loaded).toBe(true);
      expect(result.error).not.toBeNull();
      expect(result.error).toEqual(error);
    });
  });
});
