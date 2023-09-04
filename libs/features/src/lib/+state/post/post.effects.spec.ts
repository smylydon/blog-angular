import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Update } from '@ngrx/entity';

import { of, ReplaySubject, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

import { PostEffects } from './post.effects';
import { PostActions } from './post.actions';
import { NewPost, Post } from './post.model';
import { ApiService, HelperService } from '../../services/index';
import { posts as PostsArray } from '../../mocks/mocks';

describe('UserEffects', () => {
  const helper = new HelperService();
  const postsList: Post[] = helper.convertPostEntityToPost(PostsArray);
  const aPost = postsList[0];
  const newPost = <NewPost>{
    title: aPost.title,
    userId: aPost.userId,
    body: aPost.body,
  };
  const post_id = 133;
  const updatedPost: Update<Post> = <Update<Post>>{
    id: Number(aPost.id),
    changes: newPost,
  };
  let actions$: ReplaySubject<Action>;
  let effects: PostEffects;
  let apiService: ApiService;

  describe('success', () => {
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
              savePost: jest.fn(() =>
                of(<Post>{
                  ...newPost,
                  id: post_id,
                })
              ),
              deletePost: jest.fn(() => of(post_id)),
              updatePost: jest.fn(() => of(updatedPost)),
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

      expect(apiService.getPosts).toHaveBeenCalled();
      expect(result).toEqual(
        PostActions.loadPostsSuccess({
          posts: postsList,
        })
      );
    });

    it('should save post', async () => {
      actions$.next(
        PostActions.savePost({
          post: newPost,
        })
      );

      const result = await new Promise((resolve) =>
        effects.savePost$.pipe(take(1)).subscribe(resolve)
      );

      expect(apiService.savePost).toHaveBeenCalledWith(newPost);
      expect(result).toEqual(
        PostActions.savePostSuccess({
          post: <Post>{
            ...newPost,
            id: post_id,
          },
        })
      );
    });

    it('should delete post', async () => {
      actions$.next(
        PostActions.deletePost({
          post_id,
        })
      );

      const result = await new Promise((resolve) =>
        effects.deletePost$.pipe(take(1)).subscribe(resolve)
      );

      expect(apiService.deletePost).toHaveBeenCalledWith(post_id);
      expect(result).toEqual(
        PostActions.deletePostSuccess({
          post_id,
        })
      );
    });

    it('should update post', async () => {
      actions$.next(
        PostActions.updatePost({
          update: updatedPost,
        })
      );

      const result = await new Promise((resolve) =>
        effects.updatePost$.pipe(take(1)).subscribe(resolve)
      );

      expect(apiService.updatePost).toHaveBeenCalledWith(updatedPost);
      expect(result).toEqual(
        PostActions.updatePostSuccess({
          update: updatedPost,
        })
      );
    });
  });

  describe('failure', () => {
    const error: Error = new Error('Test Error');

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
              getPosts: jest.fn(() => throwError(() => error)),
              savePost: jest.fn(() => throwError(() => error)),
              deletePost: jest.fn(() => throwError(() => error)),
              updatePost: jest.fn(() => throwError(() => error)),
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

    it('should throwError on getPosts', async () => {
      actions$.next(PostActions.intializePosts());

      const result = await new Promise((resolve) =>
        effects.loadPosts$.pipe(take(1)).subscribe(resolve)
      );

      expect(apiService.getPosts).toHaveBeenCalled();
      expect(result).toEqual(
        PostActions.loadPostsFailure({
          error,
        })
      );
    });

    it('should throwError on savePost', async () => {
      actions$.next(
        PostActions.savePost({
          post: newPost,
        })
      );

      const result = await new Promise((resolve) =>
        effects.savePost$.pipe(take(1)).subscribe(resolve)
      );

      expect(apiService.savePost).toHaveBeenCalledWith(newPost);
      expect(result).toEqual(
        PostActions.savePostFailure({
          error,
        })
      );
    });

    it('should throwError on deletePost', async () => {
      actions$.next(
        PostActions.deletePost({
          post_id,
        })
      );

      const result = await new Promise((resolve) =>
        effects.deletePost$.pipe(take(1)).subscribe(resolve)
      );

      expect(apiService.deletePost).toHaveBeenCalledWith(post_id);
      expect(result).toEqual(
        PostActions.deletePostFailure({
          error,
        })
      );
    });

    it('should throwError on updatePost', async () => {
      actions$.next(
        PostActions.updatePost({
          update: updatedPost,
        })
      );

      const result = await new Promise((resolve) =>
        effects.updatePost$.pipe(take(1)).subscribe(resolve)
      );

      expect(apiService.updatePost).toHaveBeenCalledWith(updatedPost);
      expect(result).toEqual(
        PostActions.updatePostFailure({
          error,
        })
      );
    });
  });
});
