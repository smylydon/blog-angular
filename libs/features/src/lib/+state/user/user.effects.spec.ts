import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { of, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserEffects } from './user.effects';
import { UserActions } from './user.actions';
import { ApiService } from '../../services/api.service';
import { users as UsersArray } from '../../mocks/mocks';

describe('UserEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: UserEffects;
  let apiService: ApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            users: null,
          },
        }),
        {
          provide: ApiService,
          useValue: {
            getUsers: jest.fn(() => of(UsersArray)),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    effects = TestBed.inject(UserEffects);
    apiService = TestBed.inject(ApiService);
    actions$ = new ReplaySubject();
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get users', async () => {
    actions$.next(UserActions.intializeUsers());

    const result = await new Promise((resolve) =>
      effects.loadUsers$.pipe(take(1)).subscribe(resolve)
    );

    expect(apiService.getUsers).toHaveBeenCalledWith();
    expect(result).toEqual(
      UserActions.loadUsersSuccess({
        users: UsersArray,
      })
    );
  });
});
