import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { Post } from '../+state/post/post.model';
import { FeaturesFacadeService } from '../+state/features-facade.service';

export const singlePostResolver: ResolveFn<Observable<Post | undefined>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  facade: FeaturesFacadeService = inject(FeaturesFacadeService)
): Observable<Post | undefined> => {
  const postId = route.params['id'];

  return facade.currentPostById(postId);
};
