import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { Post } from '../+state/post/post.model';
import { singlePostResolver } from './single-post.resolver';

describe('singlePostResolver', () => {
  const executeResolver: ResolveFn<Observable<Post | undefined>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      singlePostResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
