import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../+state/post/post.model';
import { getAllPosts } from '../+state/post/post.selectors';

export const singlePostResolver: ResolveFn<Observable<Post | undefined>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store = inject(Store)
): Observable<Post | undefined> => {
  return store.select(getAllPosts).pipe(
    map((posts: Post[]) => {
      const postId = Number(route.params['id']);
      if (Array.isArray(posts) && posts.length > 0) {
        const post: Post | undefined = posts.find(
          (post: Post) => Number(post.id) === postId
        );
        return post;
      } else {
        return undefined;
      }
    })
  );
};
