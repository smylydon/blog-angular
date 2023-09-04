import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { of, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { PostEffects } from './post.effects';
import { PostActions } from './post.actions';
import { Post } from './post.model';
import { ApiService, HelperService } from '../../services/index';
import { posts as PostsArray } from '../../mocks/mocks';

describe('UserEffects', () => {
  const helper = new HelperService();
  const postsList: Post[] = helper.convertPostEntityToPost(PostsArray);
  let actions$: ReplaySubject<Action>;
  let effects: PostEffects;
  let apiService: ApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            posts: null,
          },
        }),
        {
          provide: ApiService,
          useValue: {
            getPosts: jest.fn(() => of(postsList)),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    effects = TestBed.inject(PostEffects);
    apiService = TestBed.inject(ApiService);
    actions$ = new ReplaySubject();
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should get posts', async () => {
    actions$.next(PostActions.intializePosts());

    const result = await new Promise((resolve) =>
      effects.loadPosts$.pipe(take(1)).subscribe(resolve)
    );

    expect(apiService.getPosts).toHaveBeenCalledWith();
    expect(result).toEqual(
      PostActions.loadPostsSuccess({
        posts: postsList,
      })
    );
  });
});
