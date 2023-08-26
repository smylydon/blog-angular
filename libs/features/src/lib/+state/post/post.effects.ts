import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { PostActions } from './post.actions';

@Injectable()
export class PostEffects {
  loadFeaturess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.intializePosts),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
