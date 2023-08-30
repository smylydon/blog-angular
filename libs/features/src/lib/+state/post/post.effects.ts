import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PostActions } from './post.actions';
import { ApiService } from '../../services/api.service';
import { Post, PostEntity } from './post.model';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.intializePosts),
      concatMap(() =>
        this.apiService.getPosts().pipe(
          map((data: PostEntity[]) => {
            const posts: Post[] = (data || data).map<Post>(
              (post: PostEntity) => {
                return <Post>{
                  ...post,
                  reactions: {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                  },
                };
              }
            );
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

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
