import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PostActions } from './post.actions';
import { ApiService } from '../../services/api.service';
import { PostEntity } from './post.model';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.intializePosts),
      concatMap(() =>
        this.apiService.getPosts().pipe(
          map((data: PostEntity[]) => {
            return PostActions.loadPostsSuccess({
              posts: data || [],
            });
          }),
          catchError((error: any) => {
            return of(PostActions.loadPostsFailure({ error }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
