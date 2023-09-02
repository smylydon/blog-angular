import { Injectable } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Action, Store } from '@ngrx/store';

import { Observable, combineLatest, merge } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { getAllPosts, getPostsLoaded, Post, PostActions } from './index';
import { UserActions, UserEntity } from './index';

import { getAllUsers, getUsersLoaded } from './user/user.selectors';

@Injectable()
export class FeaturesFacadeService {
  public justPosts$: Observable<Post[]> = this.store.select(getAllPosts);
  public justUsers$: Observable<UserEntity[]> = this.store.select(getAllUsers);
  public posts$: Observable<Post[]>;

  constructor(private store: Store) {
    this.posts$ = combineLatest([this.justPosts$, this.justUsers$]).pipe(
      map(([posts, users]: [Post[], UserEntity[]]) => {
        return <Post[]>posts.map((post: Post) => {
          const userId = Number(post.userId);
          const author: UserEntity | undefined = users?.find(
            (user: UserEntity) => user.id === userId
          );
          return <Post>{
            ...post,
            name: author?.name || 'Unknown author',
          };
        });
      })
    );

    this.initialize();
  }

  initialize() {
    this.store.dispatch(PostActions.intializePosts());
    this.store.dispatch(UserActions.intializeUsers());
  }

  currentPostById(id: string): Observable<Post | undefined> {
    const posts = this.store.select(getAllPosts).pipe(
      map((posts: Post[]) => {
        const postId = Number(id);
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
    return this.isReady().pipe(
      filter((ready: boolean) => ready),
      concatMap(() => {
        return posts;
      })
    );
  }

  postFromRouteOrId(
    activedRoute: ActivatedRoute
  ): Observable<Post | undefined> {
    const postId = activedRoute.snapshot.params['id'];
    const routedPost$ = activedRoute.data.pipe(
      map((data: Data) => {
        let post: Post | undefined = undefined;

        if (data && data['routeResolver']) {
          post = <Post>data['routeResolver'];
        }
        return post;
      })
    );

    return merge(routedPost$, this.currentPostById(postId)).pipe(
      distinctUntilChanged()
    );
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  postsLoaded(): Observable<boolean> {
    return this.store.select(getPostsLoaded);
  }

  usersLoaded(): Observable<boolean> {
    return this.store.select(getUsersLoaded);
  }

  isReady(): Observable<boolean> {
    return combineLatest([this.postsLoaded(), this.usersLoaded()]).pipe(
      map(
        ([postsRead, usersRead]: [boolean, boolean]) => postsRead && usersRead
      )
    );
  }
}
