import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserActions } from './user.actions';
import { ApiService } from '../../services/api.service';
import { UserEntity } from './user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.intializeUsers),
      concatMap(() =>
        this.apiService.getUsers().pipe(
          map((data: UserEntity[]) => {
            return UserActions.loadUsersSuccess({
              users: data || [],
            });
          }),
          catchError((error: any) => {
            return of(UserActions.loadUsersFailure({ error }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
