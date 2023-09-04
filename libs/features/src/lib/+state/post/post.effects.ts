import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PostActions } from './post.actions';
import { ApiService } from '../../services/api.service';
import { Post } from './post.model';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.intializePosts),
      concatMap(() =>
        this.apiService.getPosts().pipe(
          map((posts: Post[]) => {
            return PostActions.loadPostsSuccess({
              posts,
            });
          }),
          catchError((error: any) => {
            return of(PostActions.loadPostsFailure({ error }));
          })
        )
      )
    );
  });

  savePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.savePost),
      concatMap(({ post }) =>
        this.apiService.savePost(post).pipe(
          map((post: Post) => {
            return PostActions.savePostSuccess({
              post,
            });
          }),
          catchError((error: any) => {
            return of(PostActions.savePostFailure({ error }));
          })
        )
      )
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.deletePost),
      concatMap(({ post_id }) =>
        this.apiService.deletePost(post_id).pipe(
          map((data: number) => {
            return PostActions.deletePostSuccess({
              post_id: data,
            });
          }),
          catchError((error: any) => {
            return of(PostActions.deletePostFailure({ error }));
          })
        )
      )
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.updatePost),
      concatMap(({ update }) =>
        this.apiService.updatePost(update).pipe(
          map(() => {
            return PostActions.updatePostSuccess({
              update,
            });
          }),
          catchError((error: any) => {
            return of(PostActions.updatePostFailure({ error }));
          })
        )
      )
    );
  });
  constructor(private actions$: Actions, private apiService: ApiService) {}
}
