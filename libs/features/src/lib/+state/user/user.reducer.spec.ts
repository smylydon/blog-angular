import { reducer, initialUsersState } from './user.reducer';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialUsersState, action);

      expect(result).toBe(initialUsersState);
    });
  });
});
